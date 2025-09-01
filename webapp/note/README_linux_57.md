# Cmon Fomntend

Simple, lightweight and useful **LAMP & LEMP** stacks to use on Docker via Docker Compose. With **PostgreSQL, MongoDB, Redis, RabbitMQ, PhpMyAdmin, PGAdmin and Mongo-Express.** You can generate your environment in whatever way you desire.

| Service       | Container Name   | Default Ports | Version       | Description                      |
|---------------|------------------|---------------|---------------|----------------------------------|
| Apache Server | demet-apache     | 80 / 443      | 2.4:alpine    | Apache Web Server                |
| Nginx Server  | demet-nginx      | 80 / 443      | stable:alpine | Nginx Web Server                 |
| PHP           | demet-php        | 9000          | 8.1 - 8.2 - 8.3 | PHP-FPM Versions (Default: 8.3)       |
| MySQL         | demet-mysql      | 3306          | 8.0           | MySQL 8.0       |
| MariaDb         | demet-mysql      | 3306          | 10.6           | MariaDb 10.6       |
| PhpMyAdmin    | demet-phpmyadmin | 8080          | latest        | MySQL Web UI                     |
| PostgreSQL    | demet-pgsql      | 5432          | 12.0          | PostgreSQL 12.0. |
| PGAdmin       | demet-pgadmin    | 8081          | 8        | PostgreSQL Web UI (dpage/pgadmin4)               |
| MongoDB       | demet-mongodb    | 27017         | 7        | NoSQL database                   |
| Mongo-Express | demet-mongoadmin | 8082          | latest        | MongoDB Web UI                   |
| Redis         | demet-redis      | 6379          | 7.2           | Redis Database                   |
| RabbitMQ      | demet-rabbitmq   | 5672 / 15672  | 3-management-alpine  | RabbitMQ Message Queue           |

You can change the image versions of the containers via `.env` file.

Default docker-compose file includes **PHP 8.3, Apache, MariaDB and PhpMyAdmin** containers.

Also, host names of all services are demet-`<HOST>`. For example, host name of `demet-mysql` container is `mysql`.

You can change the prefix of the container names in `.env` file by changing the `DEMET_PREFIX` value. For example; if you change the prefix as `local`, your container names will be `local-php`, `local-mysql`, etc...

## usage
Clone this repo by using following command:
```bash
git clone https://github.com/izniburak/demet.git && cd demet
```
Now, you must create **.env file** to specify port configuration for the containers you selected. In order to generate **.env file**, you can run following command simply:
```bash
make init
```
Great! **.env** and **docker-compose.yml** files have been generated.
If you want to change default ports or configuration,
you can edit **.env** file.

Then, configure and generate your docker-compose.yml file as you want.

**NOTE:** If you want to use default stack (PHP & Apache & MariaDB) skip the following step.
```bash
make generate
```

Now, You're ready to build the containers you selected.
In order to build the containers, you can use following command:
```bash
make build
```
If everything is okay, you can start to use **Demet!**
Let's go to http://localhost .

If you want to enter to PHP container, you can use this command simply instead of `docker exec` command:
```bash
make webserver
```

That's all! Happy coding!

## Notes
- Your project files must be in `./public/` directory.

- You can change `php.ini` settings by editting files in `./docker/php<VERSION>/conf/` directory.

- If you need new extension for PHP, you can update `./docker/php<VERSION>/Dockerfile` file and add a new extension you want.

- You can find configuration files of Webserver which you used in `./docker/apache/` or `./docker/nginx/` directory.

- You can find configuration files of other containers in `./docker/` directory as well.

- **Composer, XDebug and OPCache** are included for PHP. You can use these directly.

- If you want to enter to spesific container, you can use this command:
```bash
make run c=<container-name>
```

- You can check the List of the containers for your setup:
```bash
make ps
```

- You can use following commands simply in order to `up` or `down` docker-compose instead of `docker-compose up|down`.

for UP your containers
```bash
make up
```
for DOWN your containers:
```bash
make down
```

- If you need to restart all container, you can use this command:
```bash
make restart
```

- You can access to container logs from `./logs/` directory.

- You can use following command to clean & delete your **docker-compose** and **.env** files
```
$ make clean
```

- If you have any spesific problem, you can open a new issue on the Github. Because, some version of the docker images couldn't be work correctly depends on the your OS or system arch. For example; to use MySQL 8.x version on Arm based processors, you might need to add `platform: linux/arm64` config in section of the MySQL service at the `docker-compose.yml` file. Because, sometimes it can throw an error when try to use it directly.
**In summary**, you can try to solve the image/container issues, you can research the solution about them, and maybe you can add the issue with the solutions or open a new PR to fix them.


*I try to keep up-to-date the this tool. Please make sure the new changes before update your local clone via `git pull`. Because some changes might cause some conficts.*


# php codeigniter 3 load หน้า ช้าแก้อย่างไรได้บ้าง
 ```shell
How can I implement async requests in CodeIgniter 3 using PHP?

    public function call_api_with_token($url,$token){ 
        $ch = curl_init($url);
        $headers = [
            'Content-Type: application/json',
            'Authorization: Bearer ' . $token
        ];
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // For HTTPS, if needed
        $response = curl_exec($ch);
        curl_close($ch);
        $data = json_decode($response, true);
        //echo '<pre> data=>'; print_r($data); echo '</pre>';  
        return $data;
    }

    เพิ่มรูปแบบ ให้มี php codeigniter 3  async cache 
How does setting output cache to 30 seconds affect user experience in CI3

     $this->output->cache(1); 
     $this->output->delete_cache();

    public function index()
    {
        // 1. Load the Caching Driver
        $this->load->driver('cache', ['adapter' => 'file']);

        // 2. Define a unique key for this piece of content
        $cache_key = 'welcome_page_content';

        // 3. Try to get the content from the cache
        if ( ! $page_content = $this->cache->get($cache_key))
        {
            // If it's not in the cache, generate it now
            log_message('debug', 'Generating content, not found in cache.');
            
            // This can be the result of a database query, an API call,
            // or a rendered view fragment.
            $data_to_view['timestamp'] = date('Y-m-d H:i:s');
            $page_content = $this->load->view('content_fragment', $data_to_view, TRUE);

            // 4. Save the newly generated content to the cache for 30 seconds
            $this->cache->save($cache_key, $page_content, 30);
        }

        // 5. Load the main view and display the content
        $this->load->view('main_template', ['page_content' => $page_content]);
    }


  /********Api**********/
  /********Device**********/ 
  /********Email**********/
  /********Host**********/ 
  /********Influxdb**********/ 
  /********Line**********/     
  /********Nodered**********/  
  /********Schedule**********/
  /********Sms**********/  
  /********Token**********/   

  /********ApiDto**********/
  /********DeviceDto**********/ 
  /********EmailDto**********/
  /********HostDto**********/ 
  /********InfluxdbDto**********/ 
  /******************/     
  /********NoderedDto**********/  
  /********SchedulDto**********/
  /********SmsDto**********/  
  /********TokenDto**********/   

import { UpdateSettingDto } from './dto/update-setting.dto';

 import { ApiDto } from '@src/modules/settings/dto/create_api.dto';
 import { DeviceDto } from '@src/modules/settings/dto/create_device.dto';
 import { EmailDto } from '@src/modules/settings/dto/create_email.dto';
 import { HostDto } from '@src/modules/settings/dto/create_host.dto';
 import { InfluxdbDto } from '@src/modules/settings/dto/create_influxdb.dto';
 import { LineDto } from '@src/modules/settings/dto/create_line.dto';
import { NoderedDto } from '@src/modules/settings/dto/create_modered.dto';
import { SchedulDto } from '@src/modules/settings/dto/create_schedule.dto';
import { SmsDto } from '@src/modules/settings/dto/create_sms.dto';
import { TokenDto } from '@src/modules/settings/dto/create_token.dto';



  @HttpCode(201)
  @Post('createline')
  async create_line(
    @Res() res: Response,
    //@Body() dto: any,
    @Body(new ValidationPipe()) DataDto: LineDto,
    @Query() query: any,
    @Headers() headers: any,
    @Param() params: any,
    @Req() req: any,
  ): Promise<string> { 
    if (!DataDto) {
      res.status(200).json({
        statusCode: 200,
        code: 422,
        payload: null,
        message: 'Data is null.',
        message_th: 'ไม่พบข้อมูล.',
      });
      return;
    }   
    const Rs: any = await this.settingsService.get_name_create_line(DataDto.influxdb_name);
    if (Rs) {
        console.log('influxdb_name=>' + DataDto.influxdb_name); 
        res.status(200).json({
          statusCode: 200,
          code: 422,
          payload: {  influxdb_name: DataDto.influxdb_name },
          message: 'The influxdb_name  duplicate this data cannot create.',
          message_th: 'ข้อมูล influxdb_name '+DataDto.influxdb_name+' ซ้ำไม่สามารถเพิ่มได้.',
        });
        return;
        //throw new UnprocessableEntityException();
    }   
    await this.settingsService.create_line(DataDto); 
      res.status(200).json({
        statusCode: 200,
        code: 200,
        payload: DataDto,
        message: 'Create Data successfully..',
        message_th: 'เพิ่มข้อมูลสำเร็จ..',
      });
      return;
  }



cmon@cmon-OptiPlex-3040:~/Public/cmoniot/frontend$ docker-compose up --build -d
Building php83
[+] Building 151.3s (7/14)
 => [internal] load build definition from Dockerfile                                                                                                                                                                                    0.2s
 => => transferring dockerfile: 1.71kB                                                                                                                                                                                                  0.0s
 => [internal] load metadata for docker.io/library/php:8.3-fpm                                                                                                                                                                          0.0s
 => [internal] load .dockerignore                                                                                                                                                                                                       0.2s
 => => transferring context: 2B                                                                                                                                                                                                         0.0s
 => [internal] load build context                                                                                                                                                                                                       0.2s
 => => transferring context: 129B                                                                                                                                                                                                       0.0s
 => [ 1/10] FROM docker.io/library/php:8.3-fpm                                                                                                                                                                                          0.0s
 => CACHED [ 2/10] COPY conf/ /usr/local/etc/php/conf.d/                                                                                                                                                                                0.0s
 => ERROR [ 3/10] RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime     && ln -s /usr/include/x86_64-linux-gnu/gmp.h /usr/local/include/     && echo $TZ > /etc/timezone     && apt-get update     && apt-get -y --no-install-recom  149.7s
------
 > [ 3/10] RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime     && ln -s /usr/include/x86_64-linux-gnu/gmp.h /usr/local/include/     && echo $TZ > /etc/timezone     && apt-get update     && apt-get -y --no-install-recommends install apt-utils curl zip unzip         procps git nano wget sqlite3         zlib1g-dev libgpgme11 libgpgme11-dev         libfreetype6-dev libjpeg62-turbo-dev libmcrypt-dev libreadline-dev         libgmp-dev libmhash-dev libpng-dev libxml2-dev libssl-dev libzip-dev libpq-dev         re2c apache2-utils openssl autoconf pkg-config     && docker-php-ext-install pdo_mysql opcache zip     && docker-php-ext-configure gd --with-jpeg     && docker-php-ext-install -j$(nproc) gd     && docker-php-ext-install soap mysqli intl bcmath pcntl     && docker-php-ext-configure gmp     && docker-php-ext-install gmp     && docker-php-ext-configure pgsql -with-pgsql=/usr/local/pgsql     && docker-php-ext-install pdo_pgsql pgsql:
#0 13.34 Ign:1 http://deb.debian.org/debian bookworm InRelease
#0 25.63 Ign:2 http://deb.debian.org/debian bookworm-updates InRelease
#0 37.92 Ign:3 http://deb.debian.org/debian-security bookworm-security InRelease
#0 50.21 Ign:1 http://deb.debian.org/debian bookworm InRelease
#0 62.50 Ign:2 http://deb.debian.org/debian bookworm-updates InRelease
#0 74.78 Ign:3 http://deb.debian.org/debian-security bookworm-security InRelease
#0 87.07 Ign:1 http://deb.debian.org/debian bookworm InRelease
#0 99.36 Ign:2 http://deb.debian.org/debian bookworm-updates InRelease
#0 111.6 Ign:3 http://deb.debian.org/debian-security bookworm-security InRelease
#0 123.9 Err:1 http://deb.debian.org/debian bookworm InRelease
#0 123.9   Temporary failure resolving 'deb.debian.org'
#0 136.2 Err:2 http://deb.debian.org/debian bookworm-updates InRelease
#0 136.2   Temporary failure resolving 'deb.debian.org'
#0 148.5 Err:3 http://deb.debian.org/debian-security bookworm-security InRelease
#0 148.5   Temporary failure resolving 'deb.debian.org'
#0 148.5 Reading package lists...
#0 148.5 W: Failed to fetch http://deb.debian.org/debian/dists/bookworm/InRelease  Temporary failure resolving 'deb.debian.org'
#0 148.5 W: Failed to fetch http://deb.debian.org/debian/dists/bookworm-updates/InRelease  Temporary failure resolving 'deb.debian.org'
#0 148.5 W: Failed to fetch http://deb.debian.org/debian-security/dists/bookworm-security/InRelease  Temporary failure resolving 'deb.debian.org'
#0 148.5 W: Some index files failed to download. They have been ignored, or old ones used instead.
#0 148.6 Reading package lists...
#0 148.6 Building dependency tree...
#0 148.6 Reading state information...
#0 148.6 Package apt-utils is not available, but is referred to by another package.
#0 148.6 This may mean that the package is missing, has been obsoleted, or
#0 148.6 is only available from another source
#0 148.6 However the following packages replace it:
#0 148.6   apt
#0 148.6
#0 148.6 Package git is not available, but is referred to by another package.
#0 148.6 This may mean that the package is missing, has been obsoleted, or
#0 148.6 is only available from another source
#0 148.6
#0 148.6 Package nano is not available, but is referred to by another package.
#0 148.6 This may mean that the package is missing, has been obsoleted, or
#0 148.6 is only available from another source
#0 148.6
#0 148.6 E: Package 'apt-utils' has no installation candidate
#0 148.6 E: Unable to locate package zip
#0 148.6 E: Unable to locate package unzip
#0 148.6 E: Unable to locate package procps
#0 148.6 E: Package 'git' has no installation candidate
#0 148.6 E: Package 'nano' has no installation candidate
#0 148.6 E: Unable to locate package wget
#0 148.6 E: Unable to locate package sqlite3
#0 148.6 E: Unable to locate package zlib1g-dev
#0 148.6 E: Unable to locate package libgpgme11
#0 148.6 E: Unable to locate package libgpgme11-dev
#0 148.6 E: Unable to locate package libfreetype6-dev
#0 148.6 E: Unable to locate package libjpeg62-turbo-dev
#0 148.6 E: Unable to locate package libmcrypt-dev
#0 148.6 E: Unable to locate package libreadline-dev
#0 148.6 E: Unable to locate package libgmp-dev
#0 148.6 E: Unable to locate package libmhash-dev
#0 148.6 E: Unable to locate package libpng-dev
#0 148.6 E: Unable to locate package libxml2-dev
#0 148.6 E: Unable to locate package libssl-dev
#0 148.6 E: Unable to locate package libzip-dev
#0 148.6 E: Unable to locate package libpq-dev
#0 148.6 E: Unable to locate package apache2-utils
------
Dockerfile:8
--------------------
   7 |
   8 | >>> RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime \
   9 | >>>     && ln -s /usr/include/x86_64-linux-gnu/gmp.h /usr/local/include/ \
  10 | >>>     && echo $TZ > /etc/timezone \
  11 | >>>     && apt-get update \
  12 | >>>     && apt-get -y --no-install-recommends install apt-utils curl zip unzip \
  13 | >>>         procps git nano wget sqlite3 \
  14 | >>>         zlib1g-dev libgpgme11 libgpgme11-dev \
  15 | >>>         libfreetype6-dev libjpeg62-turbo-dev libmcrypt-dev libreadline-dev \
  16 | >>>         libgmp-dev libmhash-dev libpng-dev libxml2-dev libssl-dev libzip-dev libpq-dev \
  17 | >>>         re2c apache2-utils openssl autoconf pkg-config \
  18 | >>>     && docker-php-ext-install pdo_mysql opcache zip \
  19 | >>>     && docker-php-ext-configure gd --with-jpeg \
  20 | >>>     && docker-php-ext-install -j$(nproc) gd \
  21 | >>>     && docker-php-ext-install soap mysqli intl bcmath pcntl \
  22 | >>>     && docker-php-ext-configure gmp \
  23 | >>>     && docker-php-ext-install gmp \
  24 | >>>     && docker-php-ext-configure pgsql -with-pgsql=/usr/local/pgsql \
  25 | >>>     && docker-php-ext-install pdo_pgsql pgsql
  26 |
--------------------
ERROR: failed to solve: process "/bin/sh -c ln -snf /usr/share/zoneinfo/$TZ /etc/localtime     && ln -s /usr/include/x86_64-linux-gnu/gmp.h /usr/local/include/     && echo $TZ > /etc/timezone     && apt-get update     && apt-get -y --no-install-recommends install apt-utils curl zip unzip         procps git nano wget sqlite3         zlib1g-dev libgpgme11 libgpgme11-dev         libfreetype6-dev libjpeg62-turbo-dev libmcrypt-dev libreadline-dev         libgmp-dev libmhash-dev libpng-dev libxml2-dev libssl-dev libzip-dev libpq-dev         re2c apache2-utils openssl autoconf pkg-config     && docker-php-ext-install pdo_mysql opcache zip     && docker-php-ext-configure gd --with-jpeg     && docker-php-ext-install -j$(nproc) gd     && docker-php-ext-install soap mysqli intl bcmath pcntl     && docker-php-ext-configure gmp     && docker-php-ext-install gmp     && docker-php-ext-configure pgsql -with-pgsql=/usr/local/pgsql     && docker-php-ext-install pdo_pgsql pgsql" did not complete successfully: exit code: 100
ERROR: Service 'php83' failed to build : Build failed
cmon@cmon-OptiPlex-3040:~/Public/cmoniot/frontend$ mon@cmon-OptiPlex-3040:~/Public/cmoniot/frontend$ docker-compose up --build -d
cmon@cmon-OptiPlex-3040:~/Public/appcmon/frontend$ cmon@cmon-OptiPlex-3040:~/Public/appcmon/frontend$
[+] Building 151.3s (7/14)
 => [internal] load build definition from Dockerfile                                                                                                                                                                                    0.2s
 => => transferring dockerfile: 1.71kB                                                                                                                                                                                                  0.0s
 => [internal] load metadata for docker.io/library/php:8.3-fpm                                                                                                                                                                          0.0s
 => [internal] load .dockerignore                                                                                                                                                                                                       0.2s
 => => transferring context: 2B                                                                                                                                                                                                         0.0s
 => [internal] load build context                                                                                                                                                                                                       0.2s
 => => transferring context: 129B                                                                                                                                                                                                       0.0s
 => [ 1/10] FROM docker.io/library/php:8.3-fpm                                                                                                                                                                                          0.0s
 => CACHED [ 2/10] COPY conf/ /usr/local/etc/php/conf.d/                                                                                                                                                                                0.0s
 => ERROR [ 3/10] RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime     && ln -s /usr/include/x86_64-linux-gnu/gmp.h /usr/local/include/     && echo $TZ > /etc/timezone     && apt-get update     && apt-get -y --no-install-recom  149.7s
------
 > [ 3/10] RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime     && ln -s /usr/include/x86_64-linux-gnu/gmp.h /usr/local/include/     && echo $TZ > /etc/timezone     && apt-get update     && apt-get -y --no-install-recommends install apt-utils curl zip unzip         procps git nano wget sqlite3         zlib1g-dev libgpgme11 libgpgme11-dev         libfreetype6-dev libjpeg62-turbo-dev libmcrypt-dev libreadline-dev         libgmp-dev libmhash-dev libpng-dev libxml2-dev libssl-dev libzip-dev libpq-dev         re2c apache2-utils openssl autoconf pkg-config     && docker-php-ext-install pdo_mysql opcache zip     && docker-php-ext-configure gd --with-jpeg     && docker-php-ext-install -j$(nproc) gd     && docker-php-ext-install soap mysqli intl bcmath pcntl     && docker-php-ext-configure gmp     && docker-php-ext-install gmp     && docker-php-ext-configure pgsql -with-pgsql=/usr/local/pgsql     && docker-php-ext-install pdo_pgsql pgsql:
#0 13.34 Ign:1 http://deb.debian.org/debian bookworm InRelease
#0 25.63 Ign:2 http://deb.debian.org/debian bookworm-updates-updates InRelease
#0 37.92 Ign:3 http://deb.debian.org/debian-security bookworm-securitym-security InRelease
#0 50.21 Ign:1 http://deb.debian.org/debian bookworm
#0 62.50 Ign:2 http://deb.debian.org/debian bookworm-updates-updates InRelease
#0 74.78 Ign:3 http://deb.debian.org/debian-security bookworm-securitym-security InRelease
#0 87.07 Ign:1 http://deb.debian.org/debian bookworm
#0 99.36 Ign:2 http://deb.debian.org/debian bookworm-updates-updates InRelease
#0 111.6 Ign:3 http://deb.debian.org/debian-security bookworm-securitym-security InRelease
#0 123.9 Err:1 http://deb.debian.org/debian bookworm
#0 123.9   Temporary failure resolving 'deb.debian.org'
#0 136.2 Err:2 http://deb.debian.org/debian bookworm-updates InRelease
#0 136.2   Temporary failure resolving 'deb.debian.org'
#0 148.5 Err:3 http://deb.debian.org/debian-security bookworm-security InRelease
#0 148.5   Temporary failure resolving 'deb.debian.org'
#0 148.5 Reading package lists...
#0 148.5 W: Failed to fetch http://deb.debian.org/debian/dists/bookworm/InRelease  Temporary failure resolving 'deb.debian.org'
#0 148.5 W: Failed to fetch http://deb.debian.org/debian/dists/bookworm-updates-updates/InRelease  Temporary failure resolving 'deb.debian.org'
#0 148.5 W: Failed to fetch http://deb.debian.org/debian-security/dists/bookworm-securitym-security/InRelease  Temporary failure resolving 'deb.debian.org'
#0 148.5 W: Some index files failed to download. They have been ignored, or old ones used instead.
#0 148.6 Reading package lists...
#0 148.6 Building dependency tree...
#0 148.6 Reading state information...
#0 148.6 Package apt-utils is not available, but is referred to by another package.
#0 148.6 This may mean that the package is missing, has been obsoleted, or
#0 148.6 is only available from another source
#0 148.6 However the following packages replace it:
#0 148.6   apt
#0 148.6
#0 148.6 Package git is not available, but is referred to by another package.


SELECT "sms"."sms_id" AS sms_id, "sms"."sms_name" AS sms_name,
 "sms"."host" AS host, "sms"."port" AS port, 
"sms"."username" AS username, "sms"."password" AS password,
 "sms"."apikey" AS apikey, "sms"."originator" AS originator, 
 "sms"."updateddate" AS updateddate, "sms"."status" AS status 
FROM "public"."sd_iot_sms" "sms" 
ORDER BY "sms"."updateddate" DESC LIMIT 1000

 ```
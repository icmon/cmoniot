# docker-compose-with-node-red-flows
- node-red-node-random
- node-red-dashboard
- node-red-contrib-mdashboard 
- node-red-contrib-influxdb
- node-red-contrib-ui-time-scheduler
- node-red-contrib-admin-api-url
- node-red-contrib-admin
- node-red-node-redis
- node-red-node-email
- node-red-node-email-variabl
- node-red-contrib-node-email-state-notification


# https://flows.nodered.org/node/node-red-contrib-ui-time-scheduler

# Promt AI
- จากรูปต้องการ นำข้อมูล จาก node red มาแสดงในรูปแบบ json file ผ่าน Rest api ของ node red ทำให้หน่อย

- {"deviceId":"BAACTW02","temperature":29.42,"contRelay1":1,"actRelay1":0,"fan1":0,"overFan1":1,"contRelay2":1,"actRelay2":1,"fan2":0,"overFan2":1}



    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;
    require 'path/to/PHPMailer/src/Exception.php';
    require 'path/to/PHPMailer/src/PHPMailer.php';
    require 'path/to/PHPMailer/src/SMTP.php';
    $mail = new PHPMailer(true);
    try {
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'icmon0955@gmail.com';     // Your Gmail email
        $mail->Password = 'mbwo dofv kzno ugir';        // Gmail App password if 2-Step Verification is on
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;  // Use SSL
        $mail->Port = 465;

        $mail->setFrom('icmon0955@gmail.com', 'Your Name');
        $mail->addAddress('recipient@example.com');

        $mail->Subject = 'Test SMTP Gmail';
        $mail->Body    = 'This is a test email using smtp.gmail.com on port 465.';

        $mail->send();
        echo 'Message has been sent';
    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }

    # https://support.google.com/accounts/answer/185833?hl=en
    # https://support.google.com/accounts/answer/185833?sjid=8397559243473683912-NC
    # https://myaccount.google.com/?rapt=AEjHL4Pu9bLAnifa3tU0kxi4lZ3W1ZN2ExciMqj38vqRgNP8rguDeTM_nSLxUIuQekJTHUHVJkiNCDf0A3e2ZEx6jppUlC2M0epLGzzWkw4rum0_iihAgss
   # https://myaccount.google.com/security?utm_source=OGB&utm_medium=app

 ```shell
Node.js website:
    nodejs.org
Node-RED installation command Windows:
    npm install -g --unsafe-perm node-red
Node-RED installation command Mac/Linux:
    sudo npm install -g --unsafe-perm node-red
Bootstrap 4 website:
    getbootstrap.com
Bootswatch website:
    bootswatch.com
Bootswatch CDNs:
    bootstrapcdn.com/bootswatch/

 ```
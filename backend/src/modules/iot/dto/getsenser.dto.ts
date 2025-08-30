// src/your-module/dto/get-senser.dto.ts
import { Transform } from 'class-transformer';
import { IsString, Matches, IsOptional, IsIn, IsInt, Min } from 'class-validator';
const VALID_AGGREGATES = ['last', 'mean', 'median', 'min', 'max', 'count'];

export class GetSenserDto {
  @IsString()
  @IsOptional()
  bucket: string ='BAACTW03'; // Safer default

  @IsString()
  @IsOptional()
  measurement: string = 'temperature';

  @IsString()
  @IsOptional()
  field: string = 'value';

  @IsString()
  @IsOptional()
  start: string = '-15m';

  @IsString()
  @IsOptional()
  stop: string = 'now()';

  @IsInt()
  @Min(1)
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  limit: number = 1;

  @IsInt()
  @Min(0)
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  offset: number = 0;

  @IsString()
  @IsOptional()
  windowPeriod: string = '12h';

  @IsIn(VALID_AGGREGATES) // Ensures only valid functions are used
  @IsOptional()
  mean: string = 'last';

  @IsString()
  @IsOptional()
  tzString: string = 'Asia/Bangkok';

  @IsOptional()
  deletecache: number = 0;

  @IsOptional()
  status: number = 1;

  @IsString()
  @IsOptional()
  time: string = '-15m';

  @IsString()
  @IsOptional()
  time_start: string = '-15m';
}

/*

    http://localhost:3003/v1/iot/sensers?bucket=BAACTW02&field=value&start=-5s&stop=now()&measurement=temperature&windowPeriod=15s&limit=1&offset=0&mean=last

    http://localhost:3003/v1/iot/sensercharts?bucket=BAACTW02&field=value&start=-1h&stop=now()&measurement=temperature&windowPeriod=15m&limit=200&offset=0&mean=last

    http://localhost:3003/v1/iot/senserchart?bucket=BAACTW02&field=value&start=-1h&stop=now()&measurement=temperature&windowPeriod=1m&limit=10&offset=0&mean=last

    http://localhost:3003/v1/iot/getsenserchart?bucket=BAACTW02&field=value&start=-1h&stop=now()&measurement=temperature&windowPeriod=1m&limit=10&offset=0&mean=last


    
  time_start: time_start,
      bucket: bucket,
      measurement: measurement,
      field: field,
      start: start,
      stop: stop,
      limit: 1,
      offset: 0,
      windowPeriod: windowPeriod,
      tzString: tzString,
      mean: mean,
*/
/*
 from(bucket: "BAACTW02")
      //|> range(start: v.timeRangeStart, stop: v.timeRangeStop)
      |> range(start: -30s, stop: now())
      |> filter(fn: (r) => r["_measurement"] == "ActRelay1" 
        or r["_measurement"] == "ActRelay2" 
        or r["_measurement"] == "ContRelay1" 
        or r["_measurement"] == "ContRelay2" 
        or r["_measurement"] == "Fan1" 
        or r["_measurement"] == "Fan2" 
        or r["_measurement"] == "OverFan1" 
        or r["_measurement"] == "OverFan2" 
        or r["_measurement"] == "temperature")
      |> aggregateWindow(every: v.windowPeriod, fn: mean, createEmpty: false)
      |> limit(n:1, offset: 0)
      |> yield(name: "last")
*/
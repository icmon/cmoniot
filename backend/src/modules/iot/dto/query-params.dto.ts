export class CreateIotDto {}
// query-params.dto.ts
import { IsString, Matches } from 'class-validator';

export class QueryParams {
  @IsString()
  @Matches(/(-?\d+[smhdw]|now\(\))/, { message: 'Invalid start time format' })
  start: string;

  @IsString()
  @Matches(/(-?\d+[smhdw]|now\(\))/, { message: 'Invalid stop time format' })
  stop: string;

  @IsString()
  @Matches(/\d+[smhdw]/, { message: 'Invalid window period format' })
  windowPeriod: string;
}
// GET /temperature?start=-24h&stop=now()&windowPeriod=1h

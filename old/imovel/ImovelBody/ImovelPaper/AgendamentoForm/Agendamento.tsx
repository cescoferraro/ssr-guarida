import { Dayjs } from "dayjs";

export interface Agendamento {
  date: Dayjs | null;
  slot: string | null;
}
import { Pegawai } from "../models/billing/master/Pegawai";

export interface JwtPayload {
  id: string,
  name: string,
  norm: string,
}

export interface ResponseMetadata {
  metadata: {
    status: boolean;
    message: string;
    errCode?: number | string | null;
  },
  response?: string | Record<string, any>;
  info?: string | Record<string, any>;
}

export interface Schedule {
  id: number;
  nama: string;
  jadwal: string;
  warna_bpjs: string;
  pm_ol: string;
}

export interface DaySchedule {
  title: string;
  data: Schedule[];
}

export interface DoctorSchedule {
  tgl?: Date;
  dokter_id: number;
  kuota: number;
  kuota_bpjs: number;
  kuota_asuransi: number;
  kuota_umum: number;
  praktek: string;
  pegawai?: Pegawai;
}

export type InsuranceQuota = {
  kuota: number;
  terpakai: number;
  sisa: number;
}

export interface QuotaDoctors {
  tgl: Date | string;
  jam_praktek: string;
  kuota: number;
  bpjs: InsuranceQuota;
  asuransi: InsuranceQuota;
  umum: InsuranceQuota;
  totalPass: number;
  dokter: string;
}

export type SequelizeLogging = false | ((sql: string, timing?: number) => void);
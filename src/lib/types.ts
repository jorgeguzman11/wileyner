/** Tipos de dominio compartidos. */

export type Testimonial = {
  id: string;
  nombre: string;
  foto_url: string | null;
  tratamiento: string;
  texto: string;
  calificacion: number;
  aprobado: boolean;
  created_at: string;
};

export type Appointment = {
  id: string;
  nombre: string;
  telefono: string;
  email: string;
  service_id: string | null;
  modalidad: "consultorio" | "domicilio";
  fecha: string;
  hora: string;
  motivo: string | null;
  estado: "pendiente" | "confirmada" | "atendida" | "cancelada";
  created_at: string;
};

export type EstadoCita = Appointment["estado"];

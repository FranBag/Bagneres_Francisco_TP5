drop database clinica;
create database clinica;
use clinica;

create table MEDICO(
matricula int(11),
nombre varchar(30),
apellido varchar(30),
especialidad varchar(20),
observaciones text,
primary key(matricula)
);

create table PACIENTE(
nro_historial_clinico int(11),
nss BIGINT(20) not null,
nombre varchar(30) not null,
apellido varchar(30) not null,
domicilio varchar(50),
codigo_postal smallint(6),
telefono varchar(16),
observaciones text,
primary key(nro_historial_clinico)
);

create table INGRESO(
id_ingreso int(11),
fecha_ingreso date not null,
nro_habitacion smallint(6),
nro_cama smallint(6),
observaciones text,
nro_historial_paciente int(11),
matricula_medico int(11),
primary key(id_ingreso),
foreign key(nro_historial_paciente) references PACIENTE(nro_historial_clinico),
foreign key(matricula_medico) references MEDICO(matricula)
);



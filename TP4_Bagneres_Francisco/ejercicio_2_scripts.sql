drop database hotel;
create database hotel;
use hotel;

-- sentencias

create table HABITACION(
nro_habitacion smallint(4),
piso tinyint(2),
cant_camas tinyint(2),
primary key(nro_habitacion)
);

create table RESERVA(
nro_reserva int,
desde date,
hasta date,
nro_habitacion smallint(4),
primary key(nro_reserva),
foreign key(nro_habitacion) references HABITACION(nro_habitacion)
);

create table HUESPED(
dni int(8),
nombre varchar(40),
telefono varchar(15),
primary key(dni)
);

create table TIENE(
id int,
nro_reserva int,
dni int(8),
primary key(id),
foreign key(nro_reserva) references RESERVA(nro_reserva),
foreign key(dni) references HUESPED(dni)
);

-- inserciones

insert into HABITACION(nro_habitacion, piso, cant_camas) values
(101, 1, 2),
(102, 1, 1),
(201, 2, 3);

insert into RESERVA(nro_reserva, desde, hasta, nro_habitacion) values
(1, '2024-08-01', '2024-08-10', 101),
(2, '2024-08-05', '2024-08-15', 102),
(3, '2024-08-20', '2024-08-25', 201);

insert into HUESPED(dni, nombre, telefono) values
(12345678, 'Juan Pérez', '1234567890'),
(87654321, 'María López', '0987654321'),
(11223344, 'Carlos Gómez', '1122334455');

insert into TIENE(id, nro_reserva, dni) values
(1, 1, 12345678),
(2, 2, 87654321),
(3, 3, 11223344);


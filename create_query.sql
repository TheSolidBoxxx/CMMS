create table plan(
	id serial primary key,
	no_req varchar(20) not null,
	denominacion varchar(40) not null,
	tipo varchar(30) not null,
	fecha_plan date not null,
	prioridad smallint not null,
	hecho boolean not null,
	no_responsable varchar(10) not null,
	apellido varchar(20) not null,
	ubicacion varchar(40) not null,
	grado smallint not null,
	descripcion varchar(60) not null,
	inicio date,
	fin date,
	intervalo smallint,
	tiempo_real smallint
)

create table users(
	id serial primary key,
	apellido varchar(20) not null,
	no_responsable varchar (10) not null,
	ocupacion varchar(30) not null,
	acceso smallint not null,
	username varchar(30) not null,
	passwd varchar(50) not null,
	phone varchar(13) not null
)
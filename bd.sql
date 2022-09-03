drop database if exists sistema_empleo;

create database sistema_empleo;
use sistema_empleo;

create table tb_empleador(
	id int AUTO_INCREMENT,
    nombre varchar(30),
    n_empleo_solicitado int,
    primary key (id)
);

create table tb_empleo(
	id int AUTO_INCREMENT,
    titulo varchar(40),
    descripcion varchar(300),
    empleador int,
    postulado boolean,
    primary key (id),
    constraint FK_EMPLEADOR_EMPLEO foreign key (empleador) 
    references tb_empleador(id)
);

create table tb_postulacion(
	id char(7),
    empleo int,
    f_postulacion date,
	primary key (id),
    constraint FK_EMPLEO_POSTULACION foreign key (empleo)
    references tb_empleo(id)
)


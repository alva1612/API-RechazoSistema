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

/*EMPLEADOR INSERT*/
INSERT INTO `sistema_empleo`.`tb_empleador` (`id`, `nombre`, `n_empleo_solicitado`) VALUES ('1', 'FractalUp', '1');
INSERT INTO `sistema_empleo`.`tb_empleador` (`id`, `nombre`, `n_empleo_solicitado`) VALUES ('2', 'Google', '0');

/*EMPLEOS INSERT*/
INSERT INTO `sistema_empleo`.`tb_empleo` (`id`, `titulo`, `descripcion`, `empleador`, `postulado`) VALUES ('1', 'BackEnd Junior', 'Parece medio explotador, pero seguro que se aprende bastante', '1', '1');

/*POSTULACION INSERT*/
INSERT INTO `sistema_empleo`.`tb_postulacion` (`id`, `empleo`, `f_postulacion`) VALUES ('1', '1', '2022/09/03');

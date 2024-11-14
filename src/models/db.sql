CREATE DATABASE bat_country_prueba;

USE bat_country_prueba;

CREATE TABLE
    bandas (
        id int not null auto_increment primary key,
        nombre varchar(100) not null,
        descripcion text,
        foto BLOB
    );

CREATE TABLE
    productos (
        id int not null auto_increment primary key,
        nombre varchar(100) not null,
        descripcion text,
        precio decimal(10, 2) not null,
        imagen BLOB,
        banda_id int,
        cantidad INT,
        foreign key (banda_id) references bandas (id) on delete cascade
    );

CREATE TABLE
    contactos (
        id int not null auto_increment primary key,
        contacto varchar(100) not null,
        tipo ENUM ('correo', 'telefono', 'url'),
        banda_id int not null,
        foreign key (banda_id) references bandas (id) on delete cascade
    );

CREATE TABLE
    ventas (
        id INT NOT NULL primary key auto_increment,
        fecha timestamp default current_timestamp,
        total decimal(10, 2)
    );

CREATE TABLE
    productos_ventas (
        id int auto_increment not null primary key,
        venta_id int,
        producto_id int,
        cantidad int,
        foreign key (venta_id) references ventas (id) on delete cascade,
        foreign key (producto_id) references productos (id) on delete cascade
    );
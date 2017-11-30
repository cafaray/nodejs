drop database if exists seccom;
create database seccom character set 'utf8';
use seccom;
create table user (
    identity int auto_increment, 
    usercode varchar(120) not null, 
    fisrt varchar(120) not null, 
    last varchar(120) not null, 
    daterec date not null, 
    dateend date not null, 
    status char(1) not null, 
    primary key (identity)
);

create table authcode (
    identity int auto_increment,
    iduser int not null,
    current varchar(64) not null,
    last varchar(64) not null,
    prevs varchar(320) default '',
    primary key(identity)
);

create table rolecode (
    identity int auto_increment,
    name varchar(12) not null,
    description varchar(120) not null,
    primary key(identity)
);

create table app (
    identity int auto_increment,
    name varchar(30) not null,
    description varchar(120) not null,
    daterec date not null,
    dateend date not null,
    status char(1) not null,
    primary key(identity)
);

create table auth (
    identity int auto_increment,
    idrolecode int not null,
    iduserapp int not null,
    daterec date not null,
    dateend date not null,
    status char(1) default 'I',    
    primary key(identity)
);

create table roleauth (
    identity int auto_increment,
    idroleauth int not null,
    idservice int not null,
    cdauthcode varchar(6) not null,
    daterec date not null,
    dateend date not null,
    status char(1) not null,
    primary key(identity)
);

create table token (
    identity int auto_increment,
    cdtoken  VARCHAR(64) not null,
    daterec datetime not null,
    dateend datetime not null,
    status char(1) not null,
    iduser int not null,
    primary key(identity)
);

create table tokenlog (
    identity int auto_increment,
    idtoken int not null,
    idrequest varchar(1024) default '',
    idresponse varchar(1024) default '',
    datereg datetime not null,
    primary key(identity)
);
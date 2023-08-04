CREATE DATABASE todo_fs_db;
use todo_fs_db;

create table todos(
	id int auto_increment not null,
    title varchar(100) not null,
    primary key(id)
);

-- insert into todos(title) values("mi primer titulo");

select * from todos;

-- drop table todos;
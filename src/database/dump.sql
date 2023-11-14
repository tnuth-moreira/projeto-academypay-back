create table usuarios(
	id serial primary key,
  nome text not null,
  email text not null unique,
  senha text not null, 
  cpf text, 
  telefone int
);

create table clientes(
	id serial primary key,
  nome text not null,
  email text not null,
  cpf text not null,
  telefone int not null,
  cep text,
  logradouro text,
  complemento text,
  bairro text,
  cidade text,
  estado text,
 	usuario_id int,
  foreign key (usuario_id) references usuarios(id)
);
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
  telefone text not null,
  status text,
  cep text,
  endereco text,
  complemento text,
  bairro text,
  cidade text,
  uf varchar(2),
 	usuario_id int,
  foreign key (usuario_id) references usuarios(id)
);
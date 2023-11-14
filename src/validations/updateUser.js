const knex = require("../database/config.js");

const updateUser = async (req, res) => {
  console.log('Iniciando a rota de atualização de usuário');
  const { id } = req.params;
  const { nome, cpf, telefone, email, senha } = req.body;

  try {
    console.log(`Procurando usuário com ID ${id} no banco de dados`);
    const existingUser = await knex("usuarios").where({ id }).first();

    // Verifica se o usuário existe no banco de dados
    if (!existingUser) {
      return res.status(404).json({ erro: "Usuário não encontrado" });
    }

    // Verifica se o CPF já está cadastrado para outro usuário
    const cpfExists = await knex("usuarios").where("cpf", cpf).whereNot("id", id).first();
    if (cpfExists) {
      return res.status(409).json({ mensagem: "CPF já cadastrado!" });
    }

    // Verifica se o e-mail já está cadastrado para outro usuário
    const emailExists = await knex("usuarios").where("email", email).whereNot("id", id).first();
    if (emailExists) {
      return res.status(409).json({ mensagem: "E-mail já cadastrado!" });
    }

    // Atualiza os dados do usuário na tabela usuarios
    console.log('Atualizando dados do usuário no banco de dados');
    await knex("usuarios").where({ id }).update({
      nome,
      cpf,
      telefone,
      senha
    });

    //Atualiza os dados correspondentes
    const clientUpdateResult = await knex("clientes").where("usuario_id", id).update({
      nome,
      cpf,
      telefone
    });

    if (clientUpdateResult === 0) {
      // Se não houver correspondência na tabela clientes
      console.log('Cliente não encontrado para o usuário. Pode adicionar lógica aqui.');
    }

    // Retorno da resposta
    console.log('Usuário atualizado com sucesso');
    return res.status(203).json({ mensagem: "Atualizado com sucesso", usuario: { id, nome, cpf, telefone, email } });
  } catch (error) {
    console.error(error);
    console.log('Erro ao tentar atualizar o usuário');
    return res.status(500).json({ erro: "Erro ao atualizar o usuário" });
  }
};

module.exports = updateUser;

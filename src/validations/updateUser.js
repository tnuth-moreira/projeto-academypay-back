const knex = require("../database/config"); 

const updateUser = async (req, res) => { 
  const { id } = req.params;
  const { nome, cpf, telefone, email, senha } = req.body; 
  
  try { 
    const existingUser = await knex("usuarios").where({ id }).first(); 
    
    //Verifca se o usuario existe no banco de dados
    if(!existingUser) { 
      return res.status(404).json({ erro: "Usuario não encontrado" }); 
    }

    //Verifica se o CPF já està cadastrado para outro usuário  
    const cpfExists = await knex("usuarios").where("cpf", cpf).whereNot("id", id).first();
    if(cpfExists) { 
      return res.status(409).json({ mensagem: "CPF já cadastrado!" }); 
    } 

    //Verifica se o e-mail já está cadastrado para outro usuario 
    const emailExists = await knex("usuarios").where("email", email).whereNot("id", id).first();
    if(emailExists) { 
      return res.status(409).json({ mensagem: "E-mail já cadastrado!" });
    }

    //Atualizar os dados do usuário no banco de dados 
    await knex("usuarios").where({ id }).update({
      nome,
      cpf,
      telefone,
      email,
      senha
    });

    //Retorno da resposta 
    return res.status(203).json({ mensagem: "Atualizado com sucesso", usuario: {id, nome, cpf, telefone, email }}); 
  }catch (error) { 
    console.error(error); 
    return res.status(500).json({ erro: "Erro ao atualizar o usuário" }); 
  }
};

module.exports = updateUser;  

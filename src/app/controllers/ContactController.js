const { response } = require("express");
const ContactsRepository = require("../repositories/ContactRepository");
const ContactRepository = require("../repositories/ContactRepository");

class ContactController {
  //Listar todos os registros
  async index(request, response) {
    const { orderBy } = request.query;
    const contacts = await ContactRepository.findAll(orderBy);

    response.json(contacts);
  }

  //Obter UM registro
  async show(request, response) {
    const { id } = request.params;
    const contact = await ContactRepository.findById(id);

    if (!contact) {
      return response.status(404).json({ error: "Contact not found" });
    }

    response.json(contact);
  }

  //Criar um registro
  async store(request, response) {
    const { name, email, phone, category_id } = request.body;

    if (!name) {
      return response.status(400).json({ error: "Name is required" });
    }

    const contactExists = await ContactRepository.findByEmail(email);

    if (contactExists) {
      return response.status(400).json({ error: "This e-mail already in use" });
    }

    const contact = await ContactRepository.create({
      name,
      email,
      phone,
      category_id,
    });

    response.json(contact);
  }

  //Editar um registro
  async update(request, response) {
    const { id } = request.params;
    const { name, email, phone, category_id } = request.body;

    const contactExists = await ContactRepository.findById(id);

    if (!contactExists) {
      return response.status(404).json({ error: "Contact not found" });
    }

    if (!name) {
      return response.status(400).json({ error: "Name is required" });
    }

    const emailExists = await ContactsRepository.findByEmail(email);
    if (emailExists && emailExists.id !== id) {
      return response.status(400).json({ error: "This e-mail already in use" });
    }

    const contact = await ContactRepository.update(id, {
      name,
      email,
      phone,
      category_id,
    });
    response.json(contact);
  }

  //Deletar um registro
  async delete(request, response) {
    const { id } = request.params;

    await ContactRepository.delete(id);
    //204 - No Content - Deu certo mas não tem body
    response.sendStatus(204);
  }
}

module.exports = new ContactController();

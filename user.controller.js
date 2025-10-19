class UserController {
  static async getProfile(req, res) {
    res.json({
      success: true,
      data: {
        user: req.user,
        message: "Perfil do usuário autenticado",
      },
    });
  }

  static async listUsers(req, res) {
    const users = [
      {
        id: "1",
        nome: "Admin Sistema",
        email: "admin@empresa.com",
        role: "admin",
      },
      {
        id: "2",
        nome: "João Silva",
        email: "joao@empresa.com",
        role: "usuario",
      },
      {
        id: "3",
        nome: "Maria Santos",
        email: "maria@empresa.com",
        role: "moderador",
      },
    ];

    res.json({
      success: true,
      data: users,
    });
  }

  static async createData(req, res) {
    const { titulo, conteudo } = req.body;

    res.json({
      success: true,
      message: "Dados criados com sucesso",
      data: {
        id: Date.now().toString(),
        titulo,
        conteudo,
        autor: req.user.nome,
        criadoEm: new Date(),
      },
    });
  }

  static async adminOnly(req, res) {
    res.json({
      success: true,
      message: "Acesso exclusivo para administradores",
      data: {
        statistics: {
          totalUsers: 150,
          activeUsers: 42,
          systemHealth: "OK",
        },
      },
    });
  }
}

module.exports = UserController;

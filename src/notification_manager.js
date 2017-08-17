// Classe responsável pelo gerenciamento das
// notificações emitidas pela extensão
class NotificationManager {

  /**
   * Gera o objeto de configuração da notificação
   * @param  {object} opcoes              configurações da notificação
   * @return {NotificationOptions}        objeto de configuração
   */
  static gerarOpcoesDeNotificacao(opcoes) {
    return {
      type: opcoes.tipo,
      iconUrl: opcoes.urlIcone,
      appIconMaskUrl: opcoes.urlMascaraIconeApp,
      title: opcoes.titulo,
      message: opcoes.mensagemPrincipal,
      contextMessage: opcoes.mensagemSecundaria,
      priority: opcoes.prioridade,
      eventTime: opcoes.tempoEvento,
      buttons: opcoes.botoes,
      imageUrl: opcoes.urlImagem,
      items: opcoes.itens,
      progress: opcoes.progresso,
      isClickable: opcoes.ehClicavel,
      requireInteraction: opcoes.requerInteracao
    };
  }

  /**
   * Cria uma notificação
   * @param  {string} id                    id da notificação criada. Caso não seja passado, o mesmo será gerado. Caso contrário,
   *                                        a notificação será criada com o id informado. Existindo uma notificação com o id passado,
   *                                        esta será removida para dar lugar à nova
   * @param  {NotificationOptions} opcoes   opções de criação da notificação
   * @return {string}                       id da notificação criada
   */
  static criar(id, opcoes) {
    let idNotificacao;
    chrome.notifications.create(id, opcoes, (idGerado) => {
      idNotificacao = idGerado;
    });
    return idNotificacao;
  }

  /**
   * Atualiza uma notificação
   * @param  {string} id                  id da notificação
   * @param  {NotificationOptions} opcoes configurações da notificação
   * @return {bool}                       indica se a notificação foi encontrada
   */
  static atualizar(id, opcoes) {
    let notificacaoEncontrada;
    chrome.notifications.update(id, opcoes, (foiAtualizado) => {
      notificacaoEncontrada = foiAtualizado;
    });
    return notificacaoEncontrada;
  }

  /**
   * Remove uma notificação
   * @param  {string} id  id da notificação
   * @return {bool}       indica se a notificação foi removida
   */
  static remover(id) {
    let notificacaoRemovida;
    chrome.notifications.clear(id, (foiRemovida) => {
      notificacaoRemovida = foiRemovida;
    });
    return notificacaoRemovida;
  }

  /**
   * Obtém os ids de todas as notificações
   * @return {Set} ids das notificações
   */
  static obterTodas() {
    let ids;
    chrome.notifications.getAll((idsNotificacoes) => {
      ids = idsNotificacoes;
    });
    return ids;
  }

  /**
   * Obtém o nível de permissão de notificações definido pelo usuário
   * @return {PermissionLevel} nível de permissão
   */
  static obterNivelPermissao() {
    let nivelAtual;
    chrome.notifications.getPermissionLevel((nivelPermissaoDefinidoUsuario) => {
      nivelAtual = nivelPermissaoDefinidoUsuario;
    });
    return nivelAtual;
  }
}

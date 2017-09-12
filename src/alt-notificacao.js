/**
 * Lib responsável por gerir as notificações do Chrome.
 * @type {altNotificacao}
 */
const altNotificacao = (function() {
  "use strict";

  return {
    /**
     * Padrão para as opções de notificação
     * @return {NotificationOptions} objeto de opções padrão
     */
    get defaultOptions() {
      return {
        type: "basic",
        iconUrl: "../images/logo.png",
        title: "Notificação",
        message: "Muito prazer! Eu sou uma notificação :)"
      };
    },

    /**
     * Define o padrão para as notificações geradas
     * @param {NotificationOptions} options opções desejadas
     */
    setDefaultOptions(options) {
      this._defaultOptions = options;
    },

    /**
     * Cria uma notificação
     * @param  {string}                idNotificacao identificador da notificação criada
     * @param  {NotificationOptions}   options       conteúdo da notificação
     * @param  {Function}              callback      função de callback
     * @return {string}                id da notificação criada
     */
    criar(idNotificacao, options, callback) {
      let id;
      console.log(this.defaultOptions);
      chrome.notifications.create(idNotificacao, options || this.defaultOptions, function(idGerado) {
        if (!!callback) {
          callback();
        }
        id = idGerado;
      });
      return id;
    },

    /**
     * Atualiza uma notificação existente
     * @param  {string}                 idNotificacao identificador da notificação desejada
     * @param  {NotificationOptions}    options       conteúdo a ser atualizado
     * @param  {Function}               callback      função de callback
     * @return {bool}                   informa se uma notificação correspondente foi encontrada
     */
    atualizar(idNotificacao, options, callback) {
      chrome.notifications.update(idNotificacao, options, function(foiAtualizado) {
        if (!!callback) {
          callback();
        }
        return foiAtualizado;
      });
    },

    /**
     * Retorna todas as notificações
     * @param  {Function} callback  função de callback
     * @return {Array}              notificações encontradas
     */
    obterTodas(callback) {
      return chrome.notifications.getAll(callback);
    },

    /**
     * Obtém o nível de permissão que o usuário definiu para as notificações
     * em seu navegador.
     * @return {string} nível de permissão definido
     */
    obterNivelPermissao() {
      let nivelPermissao;
      chrome.notifications.getPermissionLevel((nivel) => {
        nivelPermissao = nivel;
      });
      return nivelPermissao;
    },

    /**
     * Limpa a notificação referente ao id informado
     * @param  {string}   idNotificacao identificador da notificação
     * @param  {Function} callback      função callback
     */
    limpar(idNotificacao, callback) {
      chrome.notifications.clear(idNotificacao, callback);
    }
  };
}());

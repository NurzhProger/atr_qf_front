var myLocalStorage = (function() {

    return {
      FindRef: function(id) {
        var elem = document.getElementById("b" + id);
        elem.setAttribute("data-bs-target", "#a" + id);
        return elem;
      },

      GetElementByID: function(id) {
        var elem = document.getElementById(id);
        return elem;
      },

      SetItem: function(itemname, token) {
        localStorage.setItem(itemname, token);
      },

      GetItem: function(itemname) {
        return localStorage.getItem(itemname)
      },

      MessageUser: function(sms) {
        alert(sms);
      },

      MD5HASH: function(password) {
        return CryptoJS.MD5(password).toString();
      }

    }

})(myLocalStorage||{})

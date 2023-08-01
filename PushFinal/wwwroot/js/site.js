//const uri = 'api/push';
////var subscription;
//var serviceWorker;

var btnInscricao = document.getElementById("subscribeButton");
var btnExcluiInscricao = document.getElementById("unsubscribeButton");


////Registra o service-worker no navegador assim que a página é aberta
//if ('serviceWorker' in navigator && 'PushManager' in window) {
//    navigator.serviceWorker.register('/js/service-worker.js').then(async sw => {
//        serviceWorker = sw;

//        subscription = await serviceWorker.pushManager.getSubscription();

//        console.log("Subscription assim que abre o navegador: ", subscription);

//        if (subscription == null || subscription == undefined) {
//            btnInscricao.disabled = false;
//            btnExcluiInscricao.disabled = true;
//        } else {
//            //já existe inscricao, então:
//            btnInscricao.disabled = true;
//            btnExcluiInscricao.disabled = false;
//        }

//    })
//}

////Se o usuário clicar em "registrar", pedir permissão para cadastrar
////Caso a permissão seja concedida, fazer inscrição do usuário para notificações push
//async function inscricaoPush() {

//    let subscription = await serviceWorker.pushManager.getSubscription();
//    console.log("Inscrição para deletar: ", subscription);

//    console.log("Em - incricao push, a subscription é: ", subscription);

//    //Obtém
//    var temPermissao = await obtemPermissaoNotificacao(subscription);

//    if (temPermissao) {
//        console.log("Usuário deu permissão para notificação");

//        if (subscription == null || subscription == undefined) {
//            btnInscricao.disabled = false;
//            btnExcluiInscricao.disabled = true;
//        } else {
//            //já existe inscricao, então:
//            btnInscricao.disabled = true;
//            btnExcluiInscricao.disabled = false;
//        }

//        console.log("Não tem subscription: ", !subscription);
//        console.log("Subscription: ", subscription);

//        if (!subscription) {
//            //Cria subscription, caso não tenha
//            await criaSubscription(subscription);

//            let sub = await serviceWorker.pushManager.getSubscription();
//            console.log("Sub após criação: ", sub);
//            console.log("Subscription após criação: ", subscription);

//             //Armazena a subscription no servidor - Oculto para fazer um teste.
//            //await inscricaoServer(sub);


//        }
//    }
//}

//async function criaSubscription(subscription) {
//    if (!subscription) {
//        console.log("Tenta criar subscription...");

//        await fetch('api/push/publickey')
//            .then(response => response.json())
//            .then(data => {
//                subscription = serviceWorker.pushManager.subscribe({
//                    userVisibleOnly: true,
//                    applicationServerKey: "BK7ceh2iOKxwOtRYxVmOsFFP2yal3oA_YHiN0NMYtZDXqu5mR6NU5mrJ4zhDrmxUhar9_caClVJWK61OHkfB2PY",
//                });
//            })
//            .catch(error => console.log('Não foi possível obter a public key', error));
//    } else {
//        console.log("Inscrição já existe ou registro do sw não encontrado.");
//    }
//}


//async function inscricaoServer(sub) {
//    console.log("Tentando armazenar a inscrição no servidor...", subscription);
//    // Desativar para impedir vários cliques
//    document.getElementById('subscribeButton').disabled = true;
//    if (subscription != null) {
//        await fetch('api/push/inscricao', {
//            method: 'POST',
//            headers: {
//                'Accept': 'application/json',
//                'Content-Type': 'application/json'
//            },
//            body: JSON.stringify(sub)
//        })
//            .then(response => response.json())
//            .catch(e => console.log('Não foi possível fazer a inscrição no servidor', e));
//    } else {
//        console.log("Inscrição não encontrada.");
//    }
//}



////deleta inscricao Push
//async function deletaInscricaoPush() {

//    let sub = await serviceWorker.pushManager.getSubscription();
//    console.log("Inscrição para deletar: ", sub);
//    await apagaInscricaoBanco();

//    subscription.unsubscribe().then(async function () {
//        //deleta subscription
//        console.log("Chegou aqui pelo menos?");

//        if (subscription == null || subscription == undefined) {
//            btnInscricao.disabled = true;
//            btnExcluiInscricao.disabled = false;
//        } else {
//            //já existe inscricao, então:
//            btnInscricao.disabled = false;
//            btnExcluiInscricao.disabled = true;
//        }

//    });
//}


//async function apagaInscricaoBanco() {
//    fetch('/api/push/deletainscricao', {
//        method: 'post',
//        headers: {
//            'Content-type': 'application/json'
//        },
//        body: JSON.stringify({
//            subscription: subscription
//        })
//    });
//}


////VERSÃO QUE FUNCIONA ABAIXO:

////if ('serviceWorker' in navigator && 'PushManager' in window) {
////    navigator.serviceWorker.register('/js/service-worker.js').then(async serviceWorker => {
////        subscription = await serviceWorker.pushManager.getSubscription();

////        console.log("AAAAAAAAAAAAAAAAAAA");

////        if (!subscription) {
////            // Faz chamada da API para obter a public Key aqui
////            fetch('api/push/publickey')
////                .then(response => response.json())
////                .then(data => {
////                    subscription = registration.pushManager.subscribe({
////                        userVisibleOnly: true,
////                        applicationServerKey: "BK7ceh2iOKxwOtRYxVmOsFFP2yal3oA_YHiN0NMYtZDXqu5mR6NU5mrJ4zhDrmxUhar9_caClVJWK61OHkfB2PY",
////                    });
////                })
////                .catch(error => console.log('Não foi possível obter a public key', error));
////    } else {
////        console.log("Registro do Service Worker não encontrado.");
////    }
////        obtemPermissaoNotificacao(subscription);
////    });
////} else {
////    console.error('Browser não suporta service workers ou mensagens push.');
////}


////Funcao que funciona de vdd socorro

////if ('serviceWorker' in navigator && 'PushManager' in window) {
////    navigator.serviceWorker.register('/js/service-worker.js').then(async serviceWorker => {
////        subscription = await serviceWorker.pushManager.getSubscription();

////        console.log("Subscription, caso tenha: ", subscription);

////        if (!subscription) {
////            // Faz chamada da API para obter a public Key aqui
////            fetch('api/push/publickey')
////                .then(response => response.json())
////                .then(data => {
////                    subscription = serviceWorker.pushManager.subscribe({
////                        userVisibleOnly: true,
////                        applicationServerKey: "BK7ceh2iOKxwOtRYxVmOsFFP2yal3oA_YHiN0NMYtZDXqu5mR6NU5mrJ4zhDrmxUhar9_caClVJWK61OHkfB2PY",
////                    });
////                })
////                .catch(error => console.log(error));
////        } else {
////            console.log("Já tem subscription.");
////        }
////        //obtemPermissaoNotificacao(subscription);
////    });
////} else {
////    console.error('Browser não suporta service workers ou mensagens push.');
////}


//async function obtemPermissaoNotificacao() {
//    try {
//        const resultadoPermissao = await Notification.requestPermission();
//        if (resultadoPermissao === 'granted') {

//            //se subscription é null ou undefined, mas a permissão é dada:
//            if (subscription == null || subscription == undefined) {
//                btnInscricao.disabled = false;
//                btnExcluiInscricao.disabled = true;
//            } else {
//                //já existe inscricao, então:
//                btnInscricao.disabled = true;
//                btnExcluiInscricao.disabled = false;
//            }
//            return true;
//        } else if (resultadoPermissao === 'denied') {
//            console.error('Permissão para notificações negada!');
//            return false;
//        } else {
//            console.warn('Permissão para notificações não foi concedida nem negada.');
//            return false;
//        }
//    } catch (error) {
//        console.error('Erro ao solicitar permissão de notificação:', error);
//    }
//}

////Converte a chave pública para o formato correto
//function urlB64ToUint8Array(base64String) {
//    const padding = '='.repeat((4 - base64String.length % 4) % 4);
//    const base64 = (base64String + padding)
//        .replace(/\-/g, '+')
//        .replace(/_/g, '/');
//    const rawData = window.atob(base64);
//    const outputArray = new Uint8Array(rawData.length);
//    for (let i = 0; i < rawData.length; ++i) {
//        outputArray[i] = rawData.charCodeAt(i);
//    }
//    return outputArray;
//}


////Chama a função a cada 5 segundos para teste (5000 milissegundos)


//async function notifyMe() {

//    if (subscription) {
//        try {
//            await fetch('/api/push/send', {
//                method: 'POST',
//                headers: {
//                    'Accept': 'application/json',
//                    'Content-Type': 'application/json'
//                },
//                body: JSON.stringify(subscription)
//            });
//            console.log('Notificação enviada para o client inscrito.');
//        } catch (error) {
//            console.log('Erro ao enviar notificação para o client inscrito.', error);
//        }
//    } else {
//        console.log('Usuário não cadastrado para receber notificações.');
//    }
//}


///*Função de teste para chamar uma API Web do ASP.NET com JS
//Conferir doc:https://learn.microsoft.com/pt-br/aspnet/core/tutorials/web-api-javascript?view=aspnetcore-6.0*/

// ****************************************************************************************************

//Versão em que não utiliza do banco de dados


var sw, sb;

if ('serviceWorker' in navigator && 'PushManager' in window) {
    navigator.serviceWorker.register('/js/service-worker.js').then(async serviceWorker => {
        subscription = await serviceWorker.pushManager.getSubscription();
        sw = serviceWorker;
        sb = subscription;
        await permiteInscricaoBotoes();

    })
}

async function inscricaoPush() {
    let temPermissao = await obtemPermissaoNotificacao();
    if (temPermissao) {
        await criaSubscription(sb);
        await permiteInscricaoBotoes();
    }
}

async function deletaInscricaoPush() {
    sb.unsubscribe().then(async function () {
        sb = null;
        await permiteInscricaoBotoes();
    });
}

async function criaSubscription(subscription) {
    if (!subscription) {
        const response = await fetch('api/push/publickey');
        const data = await response.json();
        sb = await sw.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: data.publicKey,
        });
    } else {
        console.log("Inscrição já existe ou registro do service worker não encontrado.");
    }
}

async function permiteInscricaoBotoes() {
    let subscription = await obtemSubscription();
    if (subscription == null || subscription == undefined) {
        btnInscricao.disabled = false;
        btnExcluiInscricao.disabled = true;
    } else {
        btnInscricao.disabled = true;
        btnExcluiInscricao.disabled = false;
    }
}

async function obtemSubscription() {
    return await sw.pushManager.getSubscription();
}

async function obtemPermissaoNotificacao() {
    try {
        let resultadoPermissao = await Notification.requestPermission();
        if (resultadoPermissao === 'granted') {
            permiteInscricaoBotoes();
            return true;
        } else if (resultadoPermissao === 'denied') {
            console.error('Permissão para notificações negada!');
            return false;
        } else {
            console.warn('Permissão para notificações não foi concedida nem negada.');
            return false;
        }
    } catch (error) {
        console.error('Erro ao solicitar permissão de notificação:', error);
    }
}

async function noticaPosicao() {
    if (sb) {
        try {
            await fetch('/api/push/send', {
                method: 'post',
                headers: {
                    'accept': 'application/json',
                    'content-type': 'application/json'
                },
                body: JSON.stringify(sb)
            });
            console.log('Notificação enviada para o client inscrito.');
        } catch (error) {
            console.log('Erro ao enviar notificação para o client inscrito.', error);
        }
    } else {
        console.log('Usuário não cadastrado para receber notificações.');
    }
}
// PushController.cs

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using PushFinal.Context;
using PushFinal.Models;
using PushFinal.Utils.PushFinal.Utils;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text.Json;
using WebPush;
using PushSubscription = WebPush.PushSubscription;

namespace Push.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PushController : ControllerBase
    {
        private readonly WebPushClient _client;
        private readonly ILogger<PushController> _logger;
        private readonly ApplicationDbContext _dbContext;
        private VapidDetails _vapidDetails;

        public PushController(ILogger<PushController> logger, ApplicationDbContext dbContext, IConfiguration configuration)
        {
            _logger = logger;
            _dbContext = dbContext;
            _client = new WebPushClient();

            var subject = configuration["VAPID:subject"];
            var publicKey = configuration["VAPID:publicKey"];
            var privateKey = configuration["VAPID:privateKey"];

            _vapidDetails = new VapidDetails(subject, publicKey, privateKey);
        }

        [HttpGet("publickey")]
        public async Task<IActionResult> ObtemChavePublica()
        {
            return Ok(new { _vapidDetails.PublicKey });
        }

        [HttpPost("send")]
        public async Task<IActionResult> EnviaNotificacao([FromBody] PushFinal.Models.PushSubscription subscription)
        {

            var notification = MensagensPush.PROXIMO_A_SER_ATENDINDO;
            //var options = new Dictionary<string, object> { { "TTL", 10000 }, { "vapidDetails", _vapidDetails } };

            try
            {
                //var p_subscription = new Subscription(subscription.Endpoint, subscription.Keys.P256Dh, subscription.Keys.Auth);
                _client.SendNotification(subscription.ToWebPushSubscription(), notification, _vapidDetails);
                return Ok("Notificação enviada com sucesso.");
            }
            catch (WebPushException ex)
            {
                _logger.LogError($"Endpoint ID: {subscription.Endpoint}");
                _logger.LogError($"Error: {ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError, "Erro ao enviar a notificação.");
            }

        }


        //[HttpPost("inscricao")]
        //public async Task<Subscription> AddInscricao([FromBody] PushFinal.Models.PushSubscription model)
        //{
        //    var subscription = new Subscription
        //    {
        //        UserId = Guid.NewGuid().ToString(),
        //        Endpoint = model.Endpoint,
        //        TempoExpiracao = model.ExpirationTime,
        //        Auth = model.Keys.Auth,
        //        P256DH = model.Keys.P256Dh
        //    };

        //    if (await _dbContext.Subscriptions.AnyAsync(s => s.P256DH == subscription.P256DH))
        //        return await _dbContext.Subscriptions.FindAsync(subscription.P256DH);

        //    await _dbContext.Subscriptions.AddAsync(subscription);
        //    await _dbContext.SaveChangesAsync();

        //    return subscription;

        //}

        //[HttpPost("deletainscricao")]
        //public async Task<IActionResult> Unsubscribe([FromBody] PushFinal.Models.PushSubscription model)
        //{
        //    try
        //    {
        //        var subscription = new Subscription
        //        {
        //            Endpoint = model.Endpoint,
        //            TempoExpiracao = model.ExpirationTime,
        //            Auth = model.Keys.Auth,
        //            P256DH = model.Keys.P256Dh
        //        };

        //        if (!await _dbContext.Subscriptions.AnyAsync(s => s.P256DH == subscription.P256DH)) return NotFound(); // ou BadRequest() dependendo do caso

        //        _dbContext.Subscriptions.Remove(subscription);
        //        await _dbContext.SaveChangesAsync();

        //        return Ok("Unsubscribed successfully."); // ou outro status de sucesso caso queira retornar algo
        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(StatusCodes.Status500InternalServerError, "Error while processing the request: " + ex.Message);
        //    }
        //}


    }
}

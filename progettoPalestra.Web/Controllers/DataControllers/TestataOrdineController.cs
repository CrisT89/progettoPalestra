using LinqKit;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using progettoPalestra.Core.DAL.Models.Data;
using progettoPalestra.Core.EntityService.DataService;
using progettoPalestra.Core.EntityService.Generics;
using progettoPalestra.Core.HelperService;
using progettoPalestra.Web.Mappings;
using progettoPalestra.Web.Mappings.ModelsDTO;
using progettoPalestra.Web.Mappings.ModelsDTO.DataDTO;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net.Mail;
using System.Threading.Tasks;

namespace progettoPalestra.Web.Controllers.DataControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestataOrdineController : ControllerBase
    {
        private TestataOrdineService _testataOrdineService;
        private AutoMappingService _autoMappingService;
        private EmailService _emailService;
        private ConfigurationService _configurationService;
        private FileService _fileService;
        private UserService _userService;

        private const string _Template_Mail_Summary = "SummaryTemplate.html";
        public TestataOrdineController(TestataOrdineService testataOrdineService, AutoMappingService autoMappingService, EmailService emailService, ConfigurationService configurationService, FileService fileService, UserService userService)
        {
            _testataOrdineService = testataOrdineService;
            _autoMappingService = autoMappingService;
            _emailService = emailService;
            _configurationService = configurationService;
            _fileService = fileService;
            _userService = userService;
        }

        [HttpGet, Route("/api/[controller]/GetAllOrders")]
        [AllowAnonymous]
        public async Task<IActionResult> GetAllOrders()
        {
            List<TestataOrdine> ordini = _testataOrdineService.GetAll().ToList();
            List<TestataOrdineDTO> ordiniDto = _autoMappingService.CurrentMapper.Map<List<TestataOrdineDTO>>(ordini);
            return Ok(ordiniDto);
        }

        [HttpGet, Route("/api/[controller]/{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetById(int id)
        {
            TestataOrdine ordine = _testataOrdineService.GetById(id);
            TestataOrdineDTO ordineDto = _autoMappingService.CurrentMapper.Map<TestataOrdineDTO>(ordine);
            return Ok(ordineDto);
        }

        [HttpPost, Route("/api/[controller]")]
        [AllowAnonymous]
        public async Task<IActionResult> SaveOrder([FromBody] TestataOrdineDTO orderDto)
        {
            TestataOrdine orderToSave = _autoMappingService.CurrentMapper.Map<TestataOrdine>(orderDto);
            int orderSavedId = _testataOrdineService.SaveAndSendAdminMail(orderToSave);
            return Ok(orderSavedId);
        }

        [HttpPut, Route("/api/[controller]/{id}")]
        public async Task<IActionResult> UpdateStatus(int id, [FromBody] int status)
        {
            TestataOrdine orderToUpdate = _testataOrdineService.Get(id);
            orderToUpdate.Status = (StatusEnum)status;
            int orderUpdatedId = _testataOrdineService.Save(orderToUpdate);
            return Ok(orderUpdatedId);
        }

        [HttpPost, Route("/api/[controller]/sendSummaryMail")]
        [AllowAnonymous]
        public async Task<IActionResult> SendSummaryMail([FromBody] MailMessageDTO message)
        {
            MailMessage mail = new MailMessage();
            mail.From = new MailAddress(_configurationService.EmailFrom);
            mail.To.Add(message.Recipient.EmailAdress);
            mail.Subject = message.Subject;

            string mailBody = _fileService.GetTemplateMail(_Template_Mail_Summary);

            mailBody = mailBody.Replace("##NAME##", message.Recipient.Name);
            mailBody = mailBody.Replace("##SURNAME##", message.Recipient.Surname);
            mailBody = mailBody.Replace("##PHONE_NUMBER##", message.Order.PhoneNumber);
            mailBody = mailBody.Replace("##ADRESS##", message.Order.Adress);
            mailBody = mailBody.Replace("##CITY##", message.Order.City);
            mailBody = mailBody.Replace("##PROVINCE##", message.Order.Province);
            mailBody = mailBody.Replace("##CAP##", message.Order.Cap.ToString());
            mailBody = mailBody.Replace("##STATE##", message.Order.State);
            if (message.Order.PreferredDate != null)
            {
                DateTime date = (DateTime)message.Order.PreferredDate.Value.ToLocalTime();
                mailBody = mailBody.Replace("##RECEPTION_DATE##", date.ToString("d"));
                
            }
            else
            {
                mailBody = mailBody.Replace("##RECEPTION_DATE##", "Nessuna preferenza scelta");
            }
            if (message.Order.PreferredTime != null)
            {
                DateTime date = (DateTime)message.Order.PreferredTime;
                mailBody = mailBody.Replace("##RECEPTION_TIME##", date.ToString("t"));

            }
            else
            {
                mailBody = mailBody.Replace("##RECEPTION_TIME##", "Nessuna preferenza scelta");
            }
            mailBody = mailBody.Replace("##TOTAL##", message.Order.OrderTotal.ToString("C"));

            string space = "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp";
            string table = "";
            foreach (var item in message.Order.RigheOrdine)
            {
                //table += "<li><p>" + item.Name + "     n. articoli: " + item.Quantity + "     " + item.Total.ToString("C") + "<br>" + "</p></li>";
                table += $"<tr><td>{item.Name}</td>     <td>{item.Quantity}</td>     <td>{item.Total:C}</td> </tr>";
                //table += item.Name;
            }
            mailBody = mailBody.Replace("##TABLE##", table);

            mail.Body = mailBody;

            _emailService.SendEmail(mail, true);
            return Ok();
        }

        
        }
}
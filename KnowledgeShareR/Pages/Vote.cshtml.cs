﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;

namespace KnowledgeShareR.Pages
{
    public class VoteModel : PageModel
    {
        private readonly ILogger<VoteModel> _logger;

        public string UserName { get; set; }

        public VoteModel(ILogger<VoteModel> logger)
        {
            _logger = logger;

        }

        public void OnGet()
        {
            this.UserName = !string.IsNullOrWhiteSpace(Request.Cookies["username"])
                                ? Request.Cookies["username"] 
                                : "";
        }

        public void OnPost()
        {
            var userName = Request.Form["UserName"];
            this.UserName = userName;
        }
    }
}

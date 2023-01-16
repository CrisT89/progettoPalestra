using progettoPalestra.Core.HelperService;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace progettoPalestra.Core.DAL.Context
{
    public class MSSQL_DbContext : DatabaseContext
    {
        public MSSQL_DbContext() : base(DbProvider.SQLServer) { }

        public MSSQL_DbContext(DbContextOptions options) : base(options) { }

        public MSSQL_DbContext(string ConnectionString, DbProvider Provider) : base(ConnectionString, Provider) { }

    }
}

using progettoPalestra.Core.DAL.Context;
using progettoPalestra.Core.DAL.Models.NotificationCenter;
using EQP.EFRepository.Core.Repository;
using System;
using System.Collections.Generic;
using System.Text;

namespace progettoPalestra.Core.DAL.Repository.NotificationCenter
{
    public class NotificationRepository : IdentityRepository<Notification>
    {
        public NotificationRepository(DatabaseContext databaseContext) : base(databaseContext)
        {
        }

        public override void Save(Notification entity, bool checkConcurrency = true)
        {
            ManageOneToManyRelationEntityState(entity.NotificationDetails, nd => nd.FK_Notification == entity.ID);

            base.Save(entity, checkConcurrency);
        }
    }
}

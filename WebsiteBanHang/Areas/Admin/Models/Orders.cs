namespace WebsiteBanHang.Areas.Admin.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;
    using System.Linq;
    using WebsiteBanHang.Class;
    public partial class Orders
    {
        Database_WebsiteDataContext db = new Database_WebsiteDataContext();
        public Orders()
        {
            Order_items = new HashSet<Order_items>();
        }

        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int id { get; set; }

        public int qty { get; set; }

        [Column(TypeName = "money")]
        public decimal price { get; set; }

        public int customer_id { get; set; }

        [Required]
        [StringLength(50)]
        public string name { get; set; }

        [Required]
        [StringLength(50)]
        public string phone { get; set; }

        [Required]
        [StringLength(50)]
        public string address { get; set; }

        public DateTime created_at { get; set; }

        public DateTime? updated_at { get; set; }

        public int? status { get; set; }

        public virtual Customers Customers { get; set; }
        public virtual ICollection<Order_items> Order_items { get; set; }

        public int CountOrderNew()
        {
            int count = (from row in db.Orders
                         where row.status == 0
                         select row).Count();
            return count;
        }

        public int CountOrderOld()
        {
            int count = (from row in db.Orders
                         where row.status == 1
                         select row).Count();
            return count;
        }

        public object GetListOrder(int status)
        {
            var query = from row in db.Orders
                        join customer in db.Customers on row.customer_id equals customer.id
                        orderby row.updated_at descending
                        where row.status == status
                        select new
                        {
                            id = row.id,
                            qty = row.qty,
                            price = row.price,
                            customer_id = row.customer_id,
                            name = row.name,
                            phone = row.phone,
                            address = row.address,
                            created_at = row.created_at,
                            updated_at = row.updated_at,
                            email = customer.email,
                            customer_name = customer.fullname,
                            status = row.status
                        };
            return query;
        }

        public object CheckOrder(int order_id)
        {
            try {
                var query = (from row in db.Orders
                             where row.id == order_id
                             select row).FirstOrDefault();
                query.status = 1;
                query.updated_at = DateTime.Now;
                db.SubmitChanges();
                return "true";

            }
            catch(Exception ex)
            {
                return ex;
            }
        }

        public object DeleteOrder(int order_id)
        {
            try
            {
                var query = (from row in db.Orders
                             where row.id == order_id
                             select row).FirstOrDefault();
                db.Orders.DeleteOnSubmit(query);
                db.SubmitChanges();
                return "true";

            }
            catch (Exception ex)
            {
                return ex;
            }
        }
    }
}

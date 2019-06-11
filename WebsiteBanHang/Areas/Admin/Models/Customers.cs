namespace WebsiteBanHang.Areas.Admin.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;
    using System.Linq;
    using WebsiteBanHang.Class;

    public partial class Customers
    {
        Database_WebsiteDataContext db = new Database_WebsiteDataContext();
        public Customers()
        {
            Orders = new HashSet<Orders>();
        }

        public int id { get; set; }

        [Required]
        [StringLength(50)]
        public string email { get; set; }

        [Required]
        [StringLength(50)]
        public string fullname { get; set; }

        [Required]
        [StringLength(50)]
        public string password { get; set; }

        public int gender { get; set; }

        [Column(TypeName = "date")]
        public DateTime? date_of_birth { get; set; }

        [StringLength(50)]
        public string phone { get; set; }

        [StringLength(50)]
        public string address { get; set; }

        public DateTime created_at { get; set; }

        public DateTime? updated_at { get; set; }

        public int? status { get; set; }
        public virtual ICollection<Orders> Orders { get; set; }

        public int CountCustomer()
        {
            int count = (from row in db.Customers
                         select row).Count();
            return count;
        }

        public object GetAllCustomer()
        {
            var query = from row in db.Customers
                        orderby row.created_at descending
                        select new {
                            id = row.id,
                            email = row.email,
                            fullname = row.fullname,
                            gender = row.gender,
                            date_of_birth = row.date_of_birth,
                            phone = row.phone,
                            address = row.address,
                            created_at = row.created_at,
                            updated_at = row.updated_at,
                            status = row.status
                        };
            return query;
        }

        public object FilterCustomer(string param)
        {
            var query = from row in db.Customers
                        orderby row.created_at descending
                        where (row.fullname.Contains(param) || (row.email.Contains(param)))
                        select new
                        {
                            id = row.id,
                            email = row.email,
                            fullname = row.fullname,
                            gender = row.gender,
                            date_of_birth = row.date_of_birth,
                            phone = row.phone,
                            address = row.address,
                            created_at = row.created_at,
                            updated_at = row.updated_at,
                            status = row.status
                        };
            return query;
        }
    }
}

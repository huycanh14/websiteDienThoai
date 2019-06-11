namespace WebsiteBanHang.Models
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
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Customers()
        {
            Orders = new HashSet<Orders>();
        }

        public int id { get; set; }

        [Required]
        [StringLength(100)]
        public string email { get; set; }

        [Required]
        [StringLength(100)]
        public string fullname { get; set; }

        [Required]
        [StringLength(100)]
        public string password { get; set; }

        public int gender { get; set; }

        [Column(TypeName = "date")]
        public DateTime? date_of_birth { get; set; }

        [StringLength(15)]
        public string phone { get; set; }

        [StringLength(100)]
        public string address { get; set; }

        public DateTime created_at { get; set; }

        public DateTime? updated_at { get; set; }

        public int status { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Orders> Orders { get; set; }

        public bool HasEmail(string email)
        {
            int count = (from row in db.Customers
                         where row.email == email
                         select row).Count();
            if (count > 0) return true;
            else return false;
        }

        public object CreateAccount(object[] value)
        {
            try
            {
                Customer account = new Customer();
                account.email = value[0].ToString();
                account.fullname = value[1].ToString();
                account.password = value[2].ToString();
                account.gender = int.Parse(value[3].ToString());
                account.date_of_birth = Convert.ToDateTime(value[4].ToString());
                account.phone = value[5].ToString();
                account.address = value[6].ToString();
                account.created_at = DateTime.Now;
                account.status = 1;
                db.Customers.InsertOnSubmit(account);
                db.SubmitChanges();
                return "true";

            }
            catch (Exception ex)
            {
                return ex;
            }
        }

        public bool Logoup(object[] value)
        {
            string email = value[0].ToString();
            string password = value[1].ToString();
            var queryLogin = from user in db.Customers
                             where user.email == email && user.password == password
                             select user;
            if (queryLogin.Count() > 0)
            {
                return true;
            }
            return false;
        }

        public object GetInfoAccount(string email)
        {
            var query = (from row in db.Customers
                         where row.email == email
                         select new
                         {
                             id = row.id,
                             email = row.email,
                             fullname = row.fullname,
                             password = row.password,
                             gender = row.gender,
                             date_of_birth = row.date_of_birth,
                             phone = row.phone,
                             address = row.address,
                             created_at = row.created_at,
                             updated_at = row.updated_at,
                             status = row.status
                         }).FirstOrDefault();
            return query;
        }

        public object UpdateAccount(object[] value)
        {
            try
            {
                Customer account = (from row in db.Customers
                                    where row.id == int.Parse(value[0].ToString())
                                 select row).FirstOrDefault();
                //foreach (Admin account in acc)
                //{
                account.email = value[1].ToString();
                account.fullname = value[2].ToString();
                account.password = value[3].ToString();
                account.gender = int.Parse(value[4].ToString());
                account.date_of_birth = Convert.ToDateTime(value[5].ToString());
                account.phone = value[6].ToString();
                account.address = value[7].ToString();
                account.updated_at = DateTime.Now;
                //}
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

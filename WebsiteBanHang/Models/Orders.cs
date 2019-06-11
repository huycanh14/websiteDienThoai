namespace WebsiteBanHang.Models
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
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Orders()
        {
            Order_items = new HashSet<Order_items>();
        }

        public int id { get; set; }

        public int qty { get; set; }

        public double price { get; set; }

        public int customer_id { get; set; }

        [Required]
        [StringLength(100)]
        public string name { get; set; }

        [Required]
        [StringLength(15)]
        public string phone { get; set; }

        [Required]
        [StringLength(200)]
        public string address { get; set; }

        public DateTime created_at { get; set; }

        public DateTime? updated_at { get; set; }

        public int status { get; set; }

        public virtual Customers Customers { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Order_items> Order_items { get; set; }

        public int AddOrder(object[] value)
        {
            try
            {
                Order account = new Order();
                account.qty = int.Parse(value[0].ToString());
                account.price = double.Parse(value[1].ToString());
                account.customer_id = int.Parse(value[2].ToString());
                account.name = value[3].ToString();
                account.phone = value[4].ToString();
                account.address = value[5].ToString();
                account.created_at = DateTime.Now;
                account.status = 0;
                db.Orders.InsertOnSubmit(account);
                db.SubmitChanges();
                return account.id;

            }
            catch (Exception ex)
            {
                return 0;
            }
        }
    }
}

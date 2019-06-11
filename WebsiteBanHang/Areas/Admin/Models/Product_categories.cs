namespace WebsiteBanHang.Areas.Admin.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;
    using System.Linq;
    using WebsiteBanHang.Class;

    public partial class Product_categories
    {
        Database_WebsiteDataContext db = new Database_WebsiteDataContext();
        public Product_categories()
        {
            Products = new HashSet<Products>();
        }

        public int id { get; set; }

        [Required]
        [StringLength(50)]
        public string name { get; set; }

        [Column(TypeName = "text")]
        public string description { get; set; }

        public DateTime created_at { get; set; }

        public DateTime? updated_at { get; set; }

        public int? status { get; set; }
        public virtual ICollection<Products> Products { get; set; }

        public object CountProductInProductCategory()
        {
            var query = db.CountProductInProductCategory();
            return query;
        }

        public object GetProductCategory(int id)
        {
            var query = from row in db.Product_categories
                        where row.id == id
                         select new
                         {
                             id = row.id,
                             name = row.name,
                             description = row.description,
                             status = row.status
                         };
            return query;
        }

        public object UpdateCategory(object[] category)
        {
            try
            {
                var query = (from pd in db.Product_categories
                             where pd.id == int.Parse(category[0].ToString())
                             select pd).Take(1);
                foreach (Product_category pr in query)
                {
                    pr.name = category[1].ToString();
                    pr.description = category[2].ToString();
                    pr.status = int.Parse(category[3].ToString());
                    pr.updated_at = DateTime.Now;
                };

                //db.Products.InsertOnSubmit(pd);
                db.SubmitChanges();
                return "true";
            }
            catch (Exception ex)
            {
                return ex;
            }
        }

        public object CreateCategory(object[] category)
        {
            try
            {
                Product_category row = new Product_category();
                row.name = category[0].ToString();
                row.description = category[1].ToString();
                row.status = int.Parse(category[2].ToString());
                row.created_at = DateTime.Now;

                db.Product_categories.InsertOnSubmit(row);
                db.SubmitChanges();
                return "true";
            }
            catch (Exception ex)
            {
                return ex;
            }
        }

        public bool DeleteCategory(int id)
        {
            try
            {
                var query = (from row in db.Product_categories
                             where row.id == id
                             select row).FirstOrDefault();
                if (query != null)
                {
                    db.Product_categories.DeleteOnSubmit(query);
                    db.SubmitChanges();
                    return true;
                }
                else
                    return false;
            }
            catch
            {
                return false;
            }
        }
    }
}

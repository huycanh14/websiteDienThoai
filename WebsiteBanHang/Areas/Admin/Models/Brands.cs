namespace WebsiteBanHang.Areas.Admin.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;
    using System.Linq;
    using WebsiteBanHang.Class;

    public partial class Brands
    {
        Database_WebsiteDataContext db = new Database_WebsiteDataContext();
        public Brands()
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

        public object CountProductInBrand()
        {
            var query = db.CountProductInBrand();
            return query;
        }

        public object GetBrand(int id)
        {
            var query = from row in db.Brands
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

        public object UpdateBrand(object[] brand)
        {
            try
            {
                var query = (from pd in db.Brands
                             where pd.id == int.Parse(brand[0].ToString())
                             select pd).Take(1);
                foreach (Brand br in query)
                {
                    br.name = brand[1].ToString();
                    br.description = brand[2].ToString();
                    br.status = int.Parse(brand[3].ToString());
                    br.updated_at = DateTime.Now;
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

        public object CreateBrand(object[] brand)
        {
            try
            {
                Brand row = new Brand();
                row.name = brand[0].ToString();
                row.description = brand[1].ToString();
                row.status = int.Parse(brand[2].ToString());
                row.created_at = DateTime.Now;

                db.Brands.InsertOnSubmit(row);
                db.SubmitChanges();
                return "true";
            }
            catch (Exception ex)
            {
                return ex;
            }
        }

        public bool DeleteBrand(int id)
        {
            try
            {
                var query = (from row in db.Brands
                             where row.id == id
                             select row).FirstOrDefault();
                if (query != null)
                {
                    db.Brands.DeleteOnSubmit(query);
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

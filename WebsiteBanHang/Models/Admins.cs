namespace WebsiteBanHang.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Admins
    {
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
        public DateTime date_of_birth { get; set; }

        [Required]
        [StringLength(15)]
        public string phone { get; set; }

        [Required]
        [StringLength(100)]
        public string address { get; set; }

        public DateTime created_at { get; set; }

        public DateTime? updated_at { get; set; }

        public int status { get; set; }
    }
}

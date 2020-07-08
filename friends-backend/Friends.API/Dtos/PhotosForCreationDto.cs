using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Friends.API.Dtos
{
    public class PhotosForCreationDto
    {
        public string Url { get; set; }
        public IFormFile File { get; set; }
        public string Description { get; set; }
        public DateTime AddedDate { get; set; }
        public string PublicId { get; set; }

        public PhotosForCreationDto()
        {
            AddedDate = DateTime.Now;
        }


    }

}

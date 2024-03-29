﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Friends.API.Dtos;
using Friends.API.Helpers;
using Friends.API.Models;
using Friends.API.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace Friends.API.Controllers
{
    [Authorize]
    [Route("api/users/{userId}/photos")]
    [ApiController]
    public class PhotosController : ControllerBase
    {
        private readonly IUserRepository _repo;
        private readonly IMapper _mapper;
        private readonly IOptions<CloudinarySettings> _options;
        private Cloudinary _cloudinary;

        public PhotosController(IUserRepository repo, IMapper mapper, IOptions<CloudinarySettings> options)
        {
            _repo = repo;
            _mapper = mapper;
            _options = options;

            Account acc = new Account(
                _options.Value.CloudName,
                _options.Value.ApiKey,
                _options.Value.ApiSecret
            );
            _cloudinary = new Cloudinary(acc);
        }

        [HttpGet("{id}", Name = "GetPhoto")]
        public async Task<IActionResult> GetPhoto(int id)
        {
            var photo = await _repo.GetPhoto(id);

            var p = _mapper.Map<PhotosForReturnDto>(photo);

            return Ok(p);
        }


        [HttpPost]
        public async Task<IActionResult> AddPhotoForUser(int userId, [FromForm] PhotosForCreationDto photosForCreationDto)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }

            var userFromRepo = await _repo.GetUser(userId);

            var file = photosForCreationDto.File;

            var uploadResult = new ImageUploadResult();

            if (file.Length > 0)
            {
                using (var stream = file.OpenReadStream())
                {
                    var uploadPrarms = new ImageUploadParams()
                    {
                        File = new FileDescription(file.Name, stream),
                        Transformation = new Transformation().Width(500).Height(600).Crop("fill").Gravity("face")
                    };
                    uploadResult = _cloudinary.Upload(uploadPrarms);
                }
            }
            photosForCreationDto.Url = uploadResult.Url.ToString();
            photosForCreationDto.PublicId = uploadResult.PublicId;

            var photo = _mapper.Map<Photo>(photosForCreationDto);

            if (!userFromRepo.Photos.Any(u => u.IsMain))
            {
                photo.IsMain = true;
            }
            userFromRepo.Photos.Add(photo);

            if (await _repo.SaveAll())
            {
                var photoToReturn = _mapper.Map<PhotosForReturnDto>(photo);
                return CreatedAtRoute("GetPhoto", new { userId = userId, id = photo.Id }, photoToReturn);
                // return CreatedAtRoute("GetPhoto", new { id = photo.Id }, photoToReturn);
            }
            return BadRequest("Could not add the photo!");
        }

        [HttpPost("{id}/setMain")]
        public async Task<IActionResult> SetMainPhoto(int userId, int id)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }

            var user = await _repo.GetUser(userId);
            if (!user.Photos.Any(p => p.Id == id))
            {
                return Unauthorized();
            }

            var requestPhoto = await _repo.GetPhoto(id);
            if (requestPhoto.IsMain)
            {
                return BadRequest("This is already the main photo");
            }
            var currentMainPhoto = await _repo.GetMainPhotoForUser(userId);
            currentMainPhoto.IsMain = false;
            requestPhoto.IsMain = true;

            if (await _repo.SaveAll())
            {
                return NoContent();
            }
            return BadRequest("Could not set photo to main");
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePhoto(int userId, int id)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }

            var user = await _repo.GetUser(userId);
            if (!user.Photos.Any(p => p.Id == id))
            {
                return Unauthorized();
            }

            var requestPhoto = await _repo.GetPhoto(id);
            if (requestPhoto.IsMain)
            {
                return BadRequest("You can not delete the main photo");
            }

            if (requestPhoto.PublicId != null)
            {
                var deletionParams = new DeletionParams(requestPhoto.PublicId);
                var result = _cloudinary.Destroy(deletionParams);

                if (result.Result == "ok")
                {
                    _repo.Delete(requestPhoto);
                }
            }
            else
            {
                _repo.Delete(requestPhoto);
            }


            if (await _repo.SaveAll())
            {
                return Ok();
            }

            return BadRequest("Failed to delete the photo");
        }

    }
}

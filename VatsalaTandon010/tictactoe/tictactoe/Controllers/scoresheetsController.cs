using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using tictactoe.Models;

namespace tictactoe.Controllers
{
    public class scoresheetsController : ApiController
    {
        private tictactoeEntities1 db = new tictactoeEntities1();

        // GET: api/scoresheets
        public IQueryable<scoresheet> Getscoresheets()
        {
            return db.scoresheets;
        }

        // GET: api/scoresheets/5
        [ResponseType(typeof(scoresheet))]
        public IHttpActionResult Getscoresheet(string id)
        {
            scoresheet scoresheet = db.scoresheets.Find(id);
            if (scoresheet == null)
            {
                return NotFound();
            }

            return Ok(scoresheet);
        }

        // PUT: api/scoresheets/5
        [ResponseType(typeof(void))]
        public IHttpActionResult Putscoresheet(string id, scoresheet scoresheet)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != scoresheet.Player)
            {
                return BadRequest();
            }

            db.Entry(scoresheet).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!scoresheetExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/scoresheets
        [ResponseType(typeof(scoresheet))]
        public IHttpActionResult Postscoresheet(scoresheet scoresheet)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.scoresheets.Add(scoresheet);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (scoresheetExists(scoresheet.Player))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = scoresheet.Player }, scoresheet);
        }

        // DELETE: api/scoresheets/5
        [ResponseType(typeof(scoresheet))]
        public IHttpActionResult Deletescoresheet(string id)
        {
            scoresheet scoresheet = db.scoresheets.Find(id);
            if (scoresheet == null)
            {
                return NotFound();
            }

            db.scoresheets.Remove(scoresheet);
            db.SaveChanges();

            return Ok(scoresheet);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool scoresheetExists(string id)
        {
            return db.scoresheets.Count(e => e.Player == id) > 0;
        }
    }
}
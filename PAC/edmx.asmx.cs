//using System;
using System.Collections.Generic;
using System.Linq;
//using System.Web;
using System.Web.Script.Services;
using System.Web.Services;
using PAC.App_Data;

namespace PAC
{
	/// <summary>
	/// Summary description for edmx1
	/// </summary>
	[WebService(Namespace = "http://tempuri.org/")]
	[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
	[System.ComponentModel.ToolboxItem(false)]
	// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
	// [System.Web.Script.Services.ScriptService]
	public class edmx1 : WebService
	{

		[WebMethod(CacheDuration = 10)]
		[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
		public List<donatur> get_data(int from_id=0,int min=0,int max=-1,int limit=10)
		{
			if (min < 0) min = 0;
			var db = new pac_entities();
			var results = db.donaturs.Where(x =>x.isdisplayed != "" && x.isdisplayed.ToLower() != "n" && x.nominal > min && x.id > from_id);
			if (max >= min)
			{
				results = results.Where(x => x.nominal <= max);
			}
			results = results.Take(limit <= 0 ? 10 : limit);
			return results.ToList();
		}
	}
}

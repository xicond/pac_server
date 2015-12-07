using System;
//using System.Collections.Generic;
using System.Linq;
//using System.Web;
using System.Web.UI;
//using System.Web.UI.WebControls;
using PAC.App_Data;

namespace PAC
{
	public partial class _Default : Page
	{
		protected void Page_Load(object sender, EventArgs e)
		{
			var db = new pac_entities();
			ltrTotal.Text = "<span id=\"total\" data=\"" + db.donaturs.Where(x => x.isdisplayed != "" && x.isdisplayed.ToLower() != "n").Sum(x => x.nominal) + "\"></span>";
		}
	}
}
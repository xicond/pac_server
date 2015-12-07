<%@ Page Title="Home Page" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="PAC._Default" %>

<asp:Content runat="server" ID="HeadContent" ContentPlaceHolderID="HeadContent">
    <style>
       html{
                height: 100%;
            }
            body {
                padding-top: 0;
                padding-bottom: 0;
                background: #202020;
                min-height: 100%;
                color: #ffff00;
                font-size: 20px;
	            border: 0;
            }
            .container{
                background: #202020;
                width: 100%;
                height: 100%;
                height: 100vh;
            }
            #data_container,.container>.row, .container>.row>[class*="col-"]{
                height: 100%;
            }
			.row.body {
				height: 77%;
				height: calc(100% - 180px);
			}
            .text,#data_container,.row.body{
                overflow-y: hidden;
            }
            .video{
                padding-left: 0;
                text-align: center;
                overflow: hidden;
            }
            video{
                height: 99.6767%;
            }
            .text .title{
                /*font-weight: bolder;*/
                color: darkblue;
                font-size: 1.8em;
                background: #99ccff;
            }
            .text>.row{
                padding-top: 10px;
                padding-bottom: 10px;
            }
			.text>.body{padding:0}
            .text .total{
                text-align: center;
                font-size: 2.75em;
                font-weight: bolder;
                padding-bottom: 20px;
                border-bottom: #2aabd2 2px solid;
            }
            .text .value{
                text-align: right;
            }
            .text .left{
                padding-left: 39px;
            }
            .text .right{
                padding-left: 39px;
                padding-right: 39px;
            }
            .text .title>.right{
                text-align: center;
            }
            .text .row.odd{
                background: darkblue;
            }
            .text .row.even{
                background: #044062;
            }
    </style>
</asp:Content>
<asp:Content runat="server" ID="BodyContent" ContentPlaceHolderID="MainContent">
            <div class="row">
            <div class="col-md-6 text">
                <div class="row total">
                    <div class="col-md-12">Total: <asp:Literal runat='server' id='ltrTotal'/></div>
                </div>
                <div class="row title">
                    <div class="col-md-6 left">nama</div>
                    <div class="col-md-6 right">jumlah</div>
                </div>
				
				<div class="row body">
					<div class="col-md-12 text" id="data_container">
						
						
					</div>
				</div>


            </div>

            <div class="col-md-6 video" style="background: blue"><video muted autoplay></video></div>
        </div>

</asp:Content>

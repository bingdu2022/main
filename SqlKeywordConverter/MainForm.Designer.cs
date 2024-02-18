namespace SqlKeywordConverter
{
  partial class MainForm
  {
    /// <summary>
    /// Required designer variable.
    /// </summary>
    private System.ComponentModel.IContainer components = null;

    /// <summary>
    /// Clean up any resources being used.
    /// </summary>
    /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
    protected override void Dispose(bool disposing)
    {
      if (disposing && (components != null))
      {
        components.Dispose();
      }
      base.Dispose(disposing);
    }

    #region Windows Form Designer generated code

    /// <summary>
    /// Required method for Designer support - do not modify
    /// the contents of this method with the code editor.
    /// </summary>
    private void InitializeComponent()
    {
      this.TxtSqlCode = new System.Windows.Forms.TextBox();
      this.BtnConvert = new System.Windows.Forms.Button();
      this.LblMessagel = new System.Windows.Forms.Label();
      this.BtnClear = new System.Windows.Forms.Button();
      this.SuspendLayout();
      // 
      // TxtSqlCode
      // 
      this.TxtSqlCode.AllowDrop = true;
      this.TxtSqlCode.Location = new System.Drawing.Point(2, 38);
      this.TxtSqlCode.Multiline = true;
      this.TxtSqlCode.Name = "TxtSqlCode";
      this.TxtSqlCode.Size = new System.Drawing.Size(797, 400);
      this.TxtSqlCode.TabIndex = 0;
      // 
      // BtnConvert
      // 
      this.BtnConvert.Location = new System.Drawing.Point(2, 3);
      this.BtnConvert.Name = "BtnConvert";
      this.BtnConvert.Size = new System.Drawing.Size(75, 29);
      this.BtnConvert.TabIndex = 1;
      this.BtnConvert.Text = "Convert";
      this.BtnConvert.UseVisualStyleBackColor = true;
      this.BtnConvert.Click += new System.EventHandler(this.ConvertButton_Click);
      // 
      // LblMessagel
      // 
      this.LblMessagel.AutoSize = true;
      this.LblMessagel.BackColor = System.Drawing.SystemColors.Info;
      this.LblMessagel.Font = new System.Drawing.Font("Microsoft Sans Serif", 8.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
      this.LblMessagel.Location = new System.Drawing.Point(83, 11);
      this.LblMessagel.Name = "LblMessagel";
      this.LblMessagel.Size = new System.Drawing.Size(121, 13);
      this.LblMessagel.TabIndex = 2;
      this.LblMessagel.Text = "Copied to clipboard!";
      this.LblMessagel.Visible = false;
      // 
      // BtnClear
      // 
      this.BtnClear.Location = new System.Drawing.Point(726, 4);
      this.BtnClear.Name = "BtnClear";
      this.BtnClear.Size = new System.Drawing.Size(73, 28);
      this.BtnClear.TabIndex = 3;
      this.BtnClear.Text = "Clear";
      this.BtnClear.UseVisualStyleBackColor = true;
      this.BtnClear.Click += new System.EventHandler(this.BtnClear_Click);
      // 
      // MainForm
      // 
      this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
      this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
      this.AutoSize = true;
      this.ClientSize = new System.Drawing.Size(800, 450);
      this.Controls.Add(this.BtnClear);
      this.Controls.Add(this.LblMessagel);
      this.Controls.Add(this.BtnConvert);
      this.Controls.Add(this.TxtSqlCode);
      this.Name = "MainForm";
      this.Text = "SqlKeywordConverter";
      this.ResumeLayout(false);
      this.PerformLayout();

    }

    #endregion

    private System.Windows.Forms.TextBox TxtSqlCode;
    private System.Windows.Forms.Button BtnConvert;
    private System.Windows.Forms.Label LblMessagel;
    private System.Windows.Forms.Button BtnClear;
  }
}


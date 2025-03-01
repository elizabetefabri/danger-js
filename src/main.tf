resource "aws_db_instance" "example" {
  identifier             = "meu-rds-instance"
  engine                = "mysql"                     # 🔹 Engine que será validada
  engine_version        = "8.0.28"                    # 🔹 Versão que será validada
  instance_class        = "db.t3.micro"
  allocated_storage     = 20
  storage_type          = "gp2"
  username             = "admin"
  password             = "password123"
  parameter_group_name  = "default.mysql8.0"
  skip_final_snapshot   = true

  tags = {
    Name    = "Banco de Teste Terraform"
    Project = "Projeto-XYZ"
  }
}

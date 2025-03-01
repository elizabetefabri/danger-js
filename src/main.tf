resource "aws_s3_bucket" "example" {
  bucket = "meu-bucket-teste-danger"
  acl    = "private"

  tags = {
    Name = "Título obrigatório"
    Project = "Projeto-XYZ"
  }
}

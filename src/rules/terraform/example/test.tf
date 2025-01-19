resource "aws_instance" "example" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t2.micro"
  tags = {
    Owner       = "Dev Team"
    Environment = "Staging"
    Project     = "TestProject"
  }
}

resource "aws_instance" "example_missing_tags" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t2.micro"
}


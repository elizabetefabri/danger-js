variable "tags" {
    type = map(string)
    default = {
        Owner       = "DefaultOwner"
        Environment = "DefaultEnv"
        Project     = "DefaultProject"
    }
}
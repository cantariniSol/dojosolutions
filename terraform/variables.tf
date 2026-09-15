variable "project_name" {
  description = "Project identifier used to name AWS resources."
  type        = string
  default     = "dojosolutions"
}

variable "environment" {
  description = "Deployment environment."
  type        = string
  default     = "dev"
}

variable "aws_region" {
  description = "AWS region for ECR and EKS resources."
  type        = string
  default     = "us-east-1"
}

variable "cost_center" {
  description = "Tag applied to resources for FinOps tracking."
  type        = string
  default     = "engineering"
}

variable "tf_state_bucket" {
  description = "S3 bucket used for remote Terraform state."
  type        = string
}

variable "tf_lock_table" {
  description = "DynamoDB table used for Terraform state locking."
  type        = string
}

variable "vpc_id" {
  description = "Existing VPC where the EKS cluster will run."
  type        = string
}

variable "private_subnet_ids" {
  description = "Private subnets associated with the EKS worker nodes."
  type        = list(string)
}

variable "kubernetes_version" {
  description = "EKS cluster version."
  type        = string
  default     = "1.31"
}

variable "desired_size" {
  description = "Desired number of nodes for the managed node group."
  type        = number
  default     = 2
}

variable "min_size" {
  description = "Minimum number of nodes for the managed node group."
  type        = number
  default     = 2
}

variable "max_size" {
  description = "Maximum number of nodes for the managed node group."
  type        = number
  default     = 4
}

#!/bin/bash
HEADER_AUTH='authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiZ3Vlc3QiLCJpYXQiOjE0ODc4ODcyOTgsImV4cCI6MTQ4Nzg5MDg5OH0.Qr6nvUWjHTFIsf_AeqfS0DL4JYOPY5rn_VDOhGMtfdw'

echo "Post to /blogs"
curl -X POST \
  -H "$HEADER_AUTH" \
  localhost:3001/api/blogs
echo

echo "Get blogs/:id"
curl -X GET \
  -H "$HEADER_AUTH" \
  localhost:3001/api/blogs/4
echo

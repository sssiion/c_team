FROM nginx:alpine
COPY ./Build /usr/share/nginx/html 
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

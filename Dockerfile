# Use the official Node.js image as base
FROM node:18.18.0

# Set the working directory in the container
WORKDIR /frontend
# RUN ls

# Copy package.json and package-lock.json to the working director
COPY marketing/ ./
# RUN ls
# RUN pwd
# Install dependencies
# RUN npm install -g yarn
RUN yarn config set @neosoft-technologies:registry https://npm.pkg.github.com && \
    yarn config set //npm.pkg.github.com/:_authToken=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
RUN yarn install --force


# Copy the rest of the application code to the working directory
COPY ./marketing/ .
# RUN ls

# Install next globally
#RUN yarn install -g next@13.5.6
RUN yarn global add next@13.5.6
# Build the Next.js application
RUN yarn build

# Expose the port Next.js is running on
EXPOSE 3005

# Command to run the Next.js application
CMD ["yarn", "start"]

class Api::V1::LinesController < ApplicationController
  def index
    @lines = Line.all
    render json: @lines, status: :ok
  end

  def show
    @line = Line.find(params[:id])
    render json: @line
  end

  def new
    @line = Line.new
    render json: @line
  end

  def create
    @line = Line.create(line_params)
    render json: @line
  end

  def update
    @line = Line.find(params[:id])
    @line.update(line_params)
    render json: @line
  end

  def destroy
    @line = Line.find(params[:id])
    @line.destroy
    render json: @line
  end

  private

  def line_params
    params.require(:line).permit(:content, :header)
  end
end

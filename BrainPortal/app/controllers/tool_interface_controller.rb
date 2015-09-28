class ToolInterfaceController < ApplicationController
  def index

    @header_scope   = current_user.available_tools
    @filtered_scope = base_filtered_scope(@header_scope.includes(:user, :group))
    @tools          = base_sorted_scope @filtered_scope

    @tag_tools = TagTool.select(:tag_id).map(&:tag_id).uniq
    @tag_tools = Tag.where(:id => @tag_tools)

    respond_to do |format|
      format.js
      format.html # index.html.erb
      format.xml  { render :xml => @tools }
    end

  end
end
